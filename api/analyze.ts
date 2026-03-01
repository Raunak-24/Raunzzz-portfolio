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
      return new Response(
        JSON.stringify({ error: "API key missing" }),
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

    const data = await geminiRes.json();

    const explanation =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI could not analyze the code.";

    return new Response(
      JSON.stringify({ explanation }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
