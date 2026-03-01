import { type Express } from "express";

export function setupAnalyzeRoute(app: Express) {
  app.post("/api/analyze", async (req, res) => {
    try {
      const { code } = req.body;

      console.log("📥 Received code:", code);
      console.log("📥 Code length:", code?.length);

      if (!code) {
        return res.status(400).json({ error: "No code provided" });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        console.error("❌ GEMINI_API_KEY is missing");
        return res.status(500).json({ error: "API key missing" });
      }

      const prompt = `
Explain the following code in simple beginner-friendly language.
Also mention:
• Programming language
• What the code does
• Any issues or improvements

Code:
${code}
`;

      console.log("📤 Sending to Gemini API...");

      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }]
              }
            ]
          })
        }
      );

      console.log(`📥 Gemini API response: ${geminiRes.status}`);

      if (!geminiRes.ok) {
        const errorData = await geminiRes.json();
        console.error("❌ Gemini API error:", errorData);
        return res.status(geminiRes.status).json({
          error: `Gemini API failed: ${errorData.error?.message || "Unknown error"}`
        });
      }

      const data = await geminiRes.json();

      if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.error("❌ Invalid response format:", data);
        return res.status(500).json({
          error: "Invalid response from AI"
        });
      }

      const explanation = data.candidates[0].content.parts[0].text;

      console.log("✅ Successfully analyzed code");

      return res.status(200).json({ explanation });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("❌ Server error:", errorMessage);
      return res.status(500).json({ error: `Server error: ${errorMessage}` });
    }
  });
}
