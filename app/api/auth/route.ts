import { NextRequest, NextResponse } from "next/server";
 
export async function GET(request: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const code = searchParams.get("code");
 

    if (action === "signin") {
        const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");
        githubAuthUrl.searchParams.set("client_id", process.env.GITHUB_CLIENT_ID!);
        githubAuthUrl.searchParams.set("redirect_uri", process.env.REDIRECT_URI!);
        githubAuthUrl.searchParams.set("scope", "read:user user:email");
        return NextResponse.redirect(githubAuthUrl.toString());
    }
 

    if (action === "callback" && code) {
 

        const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
                redirect_uri: process.env.REDIRECT_URI,
            }),
        });
 
        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;
 
        if (!accessToken) {
            return NextResponse.redirect(new URL("/?error=token", request.url));
        }
 

        const userRes = await fetch("https://api.github.com/user", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const user = await userRes.json();
 

        const emailRes = await fetch("https://api.github.com/user/emails", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const emails = await emailRes.json();
        const primaryEmail = emails.find((e: { primary: boolean; email: string }) => e.primary)?.email || "";
 

        const redirectUrl = new URL("/", request.url);
        redirectUrl.searchParams.set("name", user.name || user.login);
        redirectUrl.searchParams.set("username", user.login);
        redirectUrl.searchParams.set("email", primaryEmail);
        redirectUrl.searchParams.set("avatar", user.avatar_url);
 
        return NextResponse.redirect(redirectUrl.toString());
    }
 
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}