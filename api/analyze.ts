export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ error: "No code provided" });
    }

    const explanation = `
This looks like ${language || "unknown"} code.

• Length: ${code.length} characters
• Lines: ${code.split("\n").length}

Serverless function is working correctly ✅
`;

    return res.status(200).json({
      explanation,
      output: "Execution disabled (analysis only)",
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
