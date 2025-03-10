import { google } from "googleapis";

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;

  if (!email) {
    return Response.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A1:D1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[email, new Date().toISOString()]],
      },
    });

    return Response.json({
      status: true,
      message: "Email added to waiting list",
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return Response.json({ message: e.message }, { status: 500 });
    }
    return Response.json(
      { message: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
