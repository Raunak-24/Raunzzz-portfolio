import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, GitFork } from "lucide-react";
import { SiGithub } from "react-icons/si";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
}

export function GitHubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/Raunak-24/repos?sort=updated")
      .then((res) => res.json())
      .then((data: Repo[]) => {
        const clean = data
          .filter((r) => !r.fork)
          .slice(0, 10);
        setRepos(clean);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">GitHub</h2>
        <p className="text-muted-foreground mb-8">
          Live repositories synced from GitHub
        </p>

        {loading ? (
          <p className="text-muted-foreground">Loading repositories…</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {repos.map((repo) => (
              <Card
                key={repo.id}
                className="min-w-[260px] max-w-[260px] snap-start hover-elevate"
              >
                <CardContent className="p-5 flex flex-col h-full">
                  <h3 className="font-semibold text-base mb-1 truncate">
                    {repo.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {repo.description || "No description provided."}
                  </p>

                  <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                    <span>{repo.language || "—"}</span>

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary"
                  >
                    <SiGithub />
                    View Repo
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
