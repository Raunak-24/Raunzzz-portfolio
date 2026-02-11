export const config = {
  runtime: "edge",
};
export default async function handler(req: Request) {
  try {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const body = await req.json();
    const { code, language } = body;

    if (!code) {
      return new Response(
        JSON.stringify({ error: "No code provided" }),
        { status: 400 }
      );
    }

    // TEMP analysis (safe test)
    const explanation = `
This looks like ${language || "unknown"} code.

• Length: ${code.length} characters
• Lines: ${code.split("\n").length}

The serverless function is working correctly.
`;

    return new Response(
      JSON.stringify({
        explanation,
        output: "Execution disabled (analysis only)"
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
