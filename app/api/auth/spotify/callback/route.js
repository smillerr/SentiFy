import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}?error=${error}`);
  }

  if (code) {
    // Call the POST method to handle the code
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/auth/spotify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      }
    );

    const result = await response.json();

    if (result.success) {
      // Redirect to dashboard or home with userId
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}?userId=${result.userId}`
      );
    } else {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}?error=auth_failed`
      );
    }
  }

  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}?error=no_code`);
}
