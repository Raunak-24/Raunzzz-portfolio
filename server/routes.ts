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

  app.get("/api/github/profile", async (req, res) => {
    try {
      const username = (req.query.username as string) || DEMO_USERNAME;
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

  app.get("/api/github/repos", async (req, res) => {
    try {
      const username = (req.query.username as string) || DEMO_USERNAME;
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

  return httpServer;
}
