import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

const GITHUB_API = "https://api.github.com";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "Raunak-24";

async function fetchGitHub(path: string, token?: string) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Portfolio",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${GITHUB_API}${path}`, { headers });
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

const fallbackProfile = {
  login: "Yash",
  avatar_url: "",
  html_url: "https://github.com/Raunak-24",
  name: "Yash Priyam",
  bio: "Full-stack developer. Building elegant web experiences.",
  public_repos: 42,
  followers: 128,
  following: 67,
};

const fallbackRepos = [
  {
    id: 1,
    name: "taskflow-pro",
    full_name: "Raunak-24/taskflow-pro",
    description: "Real-time collaborative project management with kanban boards and team workflows",
    html_url: "https://github.com/Raunak-24/taskflow-pro",
    homepage: "https://taskflow.dev",
    language: "TypeScript",
    stargazers_count: 234,
    forks_count: 45,
    topics: ["react", "typescript", "websocket", "kanban"],
    updated_at: "2026-02-01T10:00:00Z",
    fork: false,
  },
  {
    id: 2,
    name: "code-snippet-hub",
    full_name: "Raunak-24/code-snippet-hub",
    description: "Developer-focused snippet manager with syntax highlighting, tagging, and sharing",
    html_url: "https://github.com/Raunak-24/code-snippet-hub",
    homepage: null,
    language: "TypeScript",
    stargazers_count: 189,
    forks_count: 32,
    topics: ["nextjs", "prisma", "tailwindcss", "trpc"],
    updated_at: "2026-01-28T14:30:00Z",
    fork: false,
  },
  {
    id: 3,
    name: "weather-viz",
    full_name: "Raunak-24/weather-viz",
    description: "Interactive weather visualization with D3.js animated charts and 7-day forecasts",
    html_url: "https://github.com/Raunak-24/weather-viz",
    homepage: "https://weatherviz.app",
    language: "JavaScript",
    stargazers_count: 156,
    forks_count: 28,
    topics: ["d3js", "react", "visualization", "weather-api"],
    updated_at: "2026-01-20T09:15:00Z",
    fork: false,
  },
  {
    id: 4,
    name: "express-rate-limiter",
    full_name: "Raunak-24/express-rate-limiter",
    description: "Lightweight Express middleware for API rate limiting with sliding window algorithm",
    html_url: "https://github.com/Raunak-24/express-rate-limiter",
    homepage: null,
    language: "TypeScript",
    stargazers_count: 312,
    forks_count: 67,
    topics: ["express", "middleware", "rate-limiting", "api"],
    updated_at: "2026-01-15T16:45:00Z",
    fork: false,
  },
  {
    id: 5,
    name: "pixel-canvas",
    full_name: "Raunak-24/pixel-canvas",
    description: "Collaborative pixel art editor with layers, animation frames, and GIF export",
    html_url: "https://github.com/Raunak-24/pixel-canvas",
    homepage: "https://pixelcanvas.io",
    language: "JavaScript",
    stargazers_count: 98,
    forks_count: 14,
    topics: ["canvas-api", "websocket", "pixel-art", "collaborative"],
    updated_at: "2026-01-10T11:20:00Z",
    fork: false,
  },
  {
    id: 6,
    name: "go-api-gateway",
    full_name: "Raunak-24/go-api-gateway",
    description: "High-performance API gateway with caching, load balancing, and monitoring",
    html_url: "https://github.com/Raunak-24/go-api-gateway",
    homepage: null,
    language: "Go",
    stargazers_count: 445,
    forks_count: 89,
    topics: ["go", "api-gateway", "microservices", "prometheus"],
    updated_at: "2026-01-05T08:30:00Z",
    fork: false,
  },
];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const githubToken = process.env.GITHUB_TOKEN;

  // ✅ GitHub Profile Endpoint
  app.get("/api/github/profile", async (req, res) => {
    try {
      const username = GITHUB_USERNAME;
      if (githubToken) {
        const profile = await fetchGitHub(`/users/${username}`, githubToken);
        return res.json({
          login: profile.login,
          avatar_url: profile.avatar_url,
          html_url: profile.html_url,
          name: profile.name,
          bio: profile.bio,
          public_repos: profile.public_repos,
          followers: profile.followers,
          following: profile.following,
        });
      }
      res.json(fallbackProfile);
    } catch (error) {
      res.json(fallbackProfile);
    }
  });

  // ✅ GitHub Repos Endpoint
  app.get("/api/github/repos", async (req, res) => {
    try {
      const username = GITHUB_USERNAME;
      if (githubToken) {
        const repos = await fetchGitHub(
          `/users/${username}/repos?sort=updated&per_page=6&type=owner`,
          githubToken
        );
        const mapped = repos
          .filter((r: any) => !r.fork)
          .slice(0, 6)
          .map((r: any) => ({
            id: r.id,
            name: r.name,
            full_name: r.full_name,
            description: r.description,
            html_url: r.html_url,
            homepage: r.homepage,
            language: r.language,
            stargazers_count: r.stargazers_count,
            forks_count: r.forks_count,
            topics: r.topics || [],
            updated_at: r.updated_at,
            fork: r.fork,
          }));
        return res.json(mapped);
      }
      res.json(fallbackRepos);
    } catch (error) {
      res.json(fallbackRepos);
    }
  });

  // ✅ AI Code Analyzer Endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      const { code } = req.body;

      console.log("📥 Received code:", code);
      console.log("📥 Code length:", code?.length);

      if (!code || !code.trim()) {
        console.log("❌ No code provided");
        return res.status(400).json({ error: "No code provided" });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        console.error("❌ GEMINI_API_KEY environment variable is not set!");
        console.error("Available env vars:", Object.keys(process.env).filter(k => !k.includes('PASSWORD')));
        return res.status(500).json({ 
          error: "GEMINI_API_KEY not configured in environment variables" 
        });
      }

      console.log("✅ API Key found (length:", apiKey.length, ")");

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

      console.log("📤 Sending request to Gemini API...");

      // ✅ Add timeout and better error handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      let geminiRes;
      try {
        geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: prompt }]
                }
              ],
              generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
              }
            }),
            signal: controller.signal
          }
        );
      } finally {
        clearTimeout(timeoutId);
      }

      console.log(`📥 Gemini API response status: ${geminiRes.status}`);

      // ✅ Get response as text first to debug
      const responseText = await geminiRes.text();
      console.log("📥 Raw response (first 500 chars):", responseText.substring(0, 500));

      if (!geminiRes.ok) {
        console.error(`❌ Gemini API error ${geminiRes.status}:`, responseText);
        return res.status(geminiRes.status).json({
          error: `Gemini API Error ${geminiRes.status}: ${responseText.substring(0, 200)}`
        });
      }

      // ✅ Parse JSON safely
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseErr) {
        console.error("❌ Failed to parse Gemini response as JSON:", parseErr);
        console.error("Response was:", responseText.substring(0, 500));
        return res.status(500).json({
          error: `Invalid JSON response from Gemini API: ${responseText.substring(0, 200)}`
        });
      }

      console.log("✅ Successfully parsed Gemini response");

      if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.error("❌ Missing expected fields in response:", JSON.stringify(data).substring(0, 500));
        return res.status(500).json({
          error: "Unexpected response format from AI - missing explanation text"
        });
      }

      const explanation = data.candidates[0].content.parts[0].text;

      console.log("✅ Code analysis successful - explanation length:", explanation.length);

      return res.status(200).json({ explanation });

    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        console.error("❌ Gemini API request timeout (>30s)");
        return res.status(504).json({ 
          error: "Request to Gemini API timed out - try again" 
        });
      }

      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("❌ Server error:", errorMessage);
      console.error("❌ Full error object:", err);
      
      return res.status(500).json({ 
        error: `Server error: ${errorMessage}` 
      });
    }
  });

  return httpServer;
}
