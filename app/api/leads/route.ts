const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzrKwFCbA54cfERUKXU3ZcALuINcGFszXCTTkMCunG3KPIqVvQv8a_3RagOVSxU1clY/exec";

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export const dynamic = "force-dynamic";

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

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({ fullName, phone }),
      redirect: "follow",
      cache: "no-store",
    });

    if (!response.ok) {
      return Response.json(
        { error: "Unable to save lead. Please try again." },
        { status: 502 },
      );
    }

    return Response.json({ success: true }, { status: 201 });
  } catch {
    return Response.json(
      { error: "Unable to save lead. Please try again." },
      { status: 502 },
    );
  }
}
