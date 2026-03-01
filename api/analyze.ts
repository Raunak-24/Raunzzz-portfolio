export default async function handler(req: any, res: any) {
  // ✅ Only handle POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { code } = req.body;

    console.log("📥 Received code:", code);
    console.log("📥 Code length:", code?.length);

    if (!code || !code.trim()) {
      return res.status(400).json({ error: "No code provided" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("❌ GEMINI_API_KEY is missing");
      return res.status(500).json({ error: "API key not configured" });
    }

    console.log("✅ API Key found");

    const prompt = `You are a helpful code explainer. Analyze and explain the following code snippet in simple, beginner-friendly language.

Provide:
1. Programming language
2. What the code does (high-level description)
3. Line-by-line breakdown
4. Any potential issues or improvements

Code to analyze:
\`\`\`
${code}
\`\`\`

Please provide a clear, educational explanation.`;

    console.log("📤 Sending to Gemini API...");

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    console.log(`📥 Gemini response status: ${geminiRes.status}`);

    const responseText = await geminiRes.text();

    if (!geminiRes.ok) {
      console.error("❌ Gemini API error:", responseText);
      return res.status(geminiRes.status).json({
        error: `Gemini API error: ${responseText.substring(0, 200)}`,
      });
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("❌ Failed to parse response:", responseText);
      return res.status(500).json({ error: "Invalid response from Gemini" });
    }

    if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error("❌ Missing text in response");
      return res.status(500).json({ error: "No explanation in response" });
    }

    const explanation = data.candidates[0].content.parts[0].text;

    console.log("✅ Analysis successful");

    return res.status(200).json({ explanation });

  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("❌ Error:", errorMsg);
    return res.status(500).json({ error: errorMsg });
  }
}
