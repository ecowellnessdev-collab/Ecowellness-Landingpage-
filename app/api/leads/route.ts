import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ADMIN_PASSWORD = "ecowellness@360";
const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

type Lead = {
  id: string;
  fullName: string;
  phone: string;
  createdAt: string;
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function readLeads(): Promise<Lead[]> {
  try {
    const file = await readFile(LEADS_FILE, "utf8");
    const leads = JSON.parse(file);

    return Array.isArray(leads) ? leads : [];
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return [];
    }

    throw error;
  }
}

async function writeLeads(leads: Lead[]) {
  await mkdir(path.dirname(LEADS_FILE), { recursive: true });
  await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
}

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function GET(request: Request) {
  const password = request.headers.get("x-admin-password");

  if (password !== ADMIN_PASSWORD) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const leads = await readLeads();

  return Response.json({
    leads: leads.sort(
      (first, second) =>
        new Date(second.createdAt).getTime() -
        new Date(first.createdAt).getTime(),
    ),
  });
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const source = payload as Record<string, unknown>;
  const fullName = cleanText(source.fullName);
  const phone = cleanText(source.phone);

  if (fullName.length < 2) {
    return Response.json({ error: "Please enter a valid name." }, { status: 400 });
  }

  if (phone.length < 6) {
    return Response.json(
      { error: "Please enter a valid phone number." },
      { status: 400 },
    );
  }

  const leads = await readLeads();
  const lead: Lead = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    fullName,
    phone,
    createdAt: new Date().toISOString(),
  };

  await writeLeads([lead, ...leads]);

  return Response.json({ lead }, { status: 201 });
}
