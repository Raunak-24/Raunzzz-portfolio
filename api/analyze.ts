export default async function handler(req: Request) {
  try {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const { code } = await req.json();

    if (!code) {
      return new Response(
        JSON.stringify({ error: "No code provided" }),
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("❌ GEMINI_API_KEY is missing in environment variables");
      return new Response(
        JSON.stringify({ error: "API key missing - check environment variables" }),
        { status: 500 }
      );
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

    console.log("📤 Sending request to Gemini API...");

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

    console.log(`📥 Gemini API Response Status: ${geminiRes.status}`);

    // ✅ Check if the API response is OK
    if (!geminiRes.ok) {
      const errorData = await geminiRes.json();
      console.error("❌ Gemini API Error:", errorData);
      return new Response(
        JSON.stringify({ 
          error: `Gemini API failed: ${errorData.error?.message || "Unknown error"}` 
        }),
        { status: geminiRes.status }
      );
    }

    const data = await geminiRes.json();

    // ✅ Better error handling for response parsing
    if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error("❌ Unexpected response format:", JSON.stringify(data, null, 2));
      return new Response(
        JSON.stringify({ 
          error: "AI response format unexpected. Please try again." 
        }),
        { status: 500 }
      );
    }

    const explanation = data.candidates[0].content.parts[0].text;

    console.log("✅ Successfully analyzed code");

    return new Response(
      JSON.stringify({ explanation }),
      { 
        status: 200,
        headers: { "Content-Type": "application/json" } 
      }
    );

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("❌ Catch block error:", errorMessage);

    // ✅ Return actual error message to frontend for debugging
    return new Response(
      JSON.stringify({ 
        error: `Server error: ${errorMessage}` 
      }),
      { status: 500 }
    );
  }
}
