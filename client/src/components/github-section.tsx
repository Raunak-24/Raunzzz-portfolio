import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Star, GitFork, Code, Users, BookOpen, AlertCircle } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { motion } from "framer-motion";
import type { GitHubRepo, GitHubProfile } from "@shared/schema";

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500 dark:bg-blue-400",
  JavaScript: "bg-yellow-500 dark:bg-yellow-400",
  Python: "bg-green-600 dark:bg-green-400",
  Go: "bg-cyan-600 dark:bg-cyan-400",
  Rust: "bg-orange-600 dark:bg-orange-400",
  HTML: "bg-red-600 dark:bg-red-400",
  CSS: "bg-purple-600 dark:bg-purple-400",
  Shell: "bg-emerald-600 dark:bg-emerald-400",
  Ruby: "bg-red-600 dark:bg-red-400",
  Java: "bg-amber-600 dark:bg-amber-400",
};

function RepoCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Card
        className="h-full hover-elevate active-elevate-2 overflow-visible"
        data-testid={`card-repo-${repo.name}`}
      >
        <CardContent className="p-4 flex flex-col h-full gap-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <BookOpen className="w-4 h-4 text-primary shrink-0" />
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sm truncate text-primary"
                data-testid={`link-repo-${repo.name}`}
              >
                {repo.name}
              </a>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-2">
            {repo.description || "No description provided."}
          </p>

          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {repo.topics.slice(0, 4).map((topic) => (
                <Badge key={topic} variant="secondary" className="text-xs font-mono">
                  {topic}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto pt-1">
            {repo.language && (
              <span className="flex items-center gap-1.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${languageColors[repo.language] || "bg-gray-400"}`}
                />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="w-3 h-3" />
              {repo.forks_count}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function RepoSkeleton() {
  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <div className="flex gap-1.5 pt-1">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <div className="flex gap-4 pt-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-10" />
        </div>
      </CardContent>
    </Card>
  );
}

function ProfileStats({ profile }: { profile: GitHubProfile }) {
  const stats = [
    { label: "Repositories", value: profile.public_repos, icon: BookOpen },
    { label: "Followers", value: profile.followers, icon: Users },
    { label: "Following", value: profile.following, icon: Users },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 mb-10">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
            <stat.icon className="w-3 h-3" />
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

export function GitHubSection() {
  const { data: profile, isLoading: profileLoading } = useQuery<GitHubProfile>({
    queryKey: ["/api/github/profile"],
  });

  const { data: repos, isLoading: reposLoading, error } = useQuery<GitHubRepo[]>({
    queryKey: ["/api/github/repos"],
  });

  return (
    <section id="github" className="py-20 sm:py-28" data-testid="section-github">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="mb-4 font-mono text-xs">
            Open Source
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            GitHub Activity
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            My open source contributions and personal projects on GitHub.
          </p>
        </motion.div>

        {profileLoading ? (
          <div className="flex justify-center gap-6 mb-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-8 w-12 mx-auto mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        ) : profile ? (
          <ProfileStats profile={profile} />
        ) : null}

        {error ? (
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-4">
                GitHub data is currently unavailable. Connect your GitHub account to display your repositories.
              </p>
              <Button variant="outline" asChild>
                <a href="https://github.com/Raunak-24/" target="_blank" rel="noopener noreferrer">
                  <SiGithub className="w-4 h-4 mr-2" />
                  Visit GitHub
                </a>
              </Button>
            </CardContent>
          </Card>
        ) : reposLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <RepoSkeleton key={i} />
            ))}
          </div>
        ) : repos && repos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo, i) => (
                <RepoCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <a
                  href={profile?.html_url || "https://github.com/Raunak-24"}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-github-profile"
                >
                  <SiGithub className="w-4 h-4 mr-2" />
                  View All Repositories
                </a>
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
