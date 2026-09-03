const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwdK-nr0vIC5nmxLnCi9fVZqwzkkyn1nM8n-aP6qDtBKnuAVzm5LOEu0bO1ABm9uhIG/exec";

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
      // The script seems to expect: [Date, name, email, phone, source]
      // To map correctly to the sheet's [TIME, NAME, PHONE, SOURCE] columns:
      // - name goes to NAME
      // - email goes to PHONE (we send phone here)
      // - phone goes to SOURCE (we send "Website" here)
      body: JSON.stringify({ fullName, email: phone, phone: "Website" }),
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
