import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, error, error_description } = req.query;

  if (error) {
    res.redirect(`/?auth=error&message=${encodeURIComponent(error_description || "Authentication failed")}`);
    return;
  }

  if (!code) {
    res.status(400).json({ error: "No code provided" });
    return;
  }

  try {
    const clientId = "774ckgbyn2k9kq";
    const clientSecret = "YWPL_AP1.MtmJrrtsCjup55Ac.xeQTKw=="; // Store this in Vercel env vars!
    const redirectUri = "https://tjm-explorer.vercel.app/callback";

    // Exchange code for access token
    const tokenResponse = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code as string,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      throw new Error("Failed to get access token");
    }
    const accessToken = tokenData.access_token;

    // Fetch user's positions from LinkedIn API
    const profileResponse = await fetch("https://api.linkedin.com/v2/me?projection=(id,positions)", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "cache-control": "no-cache",
        "X-Restli-Protocol-Version": "2.0.0",
      },
    });

    const profileData = await profileResponse.json();
    const positions = profileData.positions?.elements || [];
    const lastPosition = positions.length > 0 ? positions[0] : null;

    // Determine if the last position is freelance or CDI
    let isFreelance = false;
    if (lastPosition) {
      const companyName = lastPosition.company?.name?.toLowerCase() || "";
      const title = lastPosition.title?.toLowerCase() || "";
      // Rough heuristic: "freelance" or "self-employed" in title, or company is the user themselves
      isFreelance = title.includes("freelance") || title.includes("self-employed") || companyName === "self-employed";
      // CDI typically implies full-time employment at a company
      if (lastPosition.employmentType === "Full-time" && !isFreelance) {
        isFreelance = false; // Assume CDI
      }
    }

    // Redirect back with freelance status
    res.redirect(`/?auth=success&isFreelance=${isFreelance}`);
  } catch (error) {
    console.error("Callback error:", error);
    res.redirect("/?auth=error&message=Failed+to+process+LinkedIn+data");
  }
}