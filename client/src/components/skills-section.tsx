import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiPython,
  SiGo,
  SiRust,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGit,
  SiGraphql,
  SiFigma,
  SiAmazonwebservices,
  SiVercel,
  SiVite,
  SiLinux,
} from "react-icons/si";
import type { TechSkill } from "@shared/schema";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  react: SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  nodejs: SiNodedotjs,
  python: SiPython,
  go: SiGo,
  rust: SiRust,
  nextjs: SiNextdotjs,
  tailwindcss: SiTailwindcss,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  redis: SiRedis,
  docker: SiDocker,
  git: SiGit,
  graphql: SiGraphql,
  figma: SiFigma,
  aws: SiAmazonwebservices,
  vercel: SiVercel,
  vite: SiVite,
  linux: SiLinux,
};

const skills: TechSkill[] = [
  { name: "React", icon: "react", category: "frontend", proficiency: 95 },
  { name: "TypeScript", icon: "typescript", category: "languages", proficiency: 92 },
  { name: "Next.js", icon: "nextjs", category: "frontend", proficiency: 88 },
  { name: "TailwindCSS", icon: "tailwindcss", category: "frontend", proficiency: 94 },
  { name: "Vite", icon: "vite", category: "frontend", proficiency: 85 },
  { name: "Node.js", icon: "nodejs", category: "backend", proficiency: 90 },
  { name: "Python", icon: "python", category: "languages", proficiency: 82 },
  { name: "Go", icon: "go", category: "languages", proficiency: 70 },
  { name: "Rust", icon: "rust", category: "languages", proficiency: 55 },
  { name: "JavaScript", icon: "javascript", category: "languages", proficiency: 95 },
  { name: "PostgreSQL", icon: "postgresql", category: "backend", proficiency: 85 },
  { name: "MongoDB", icon: "mongodb", category: "backend", proficiency: 78 },
  { name: "Redis", icon: "redis", category: "backend", proficiency: 75 },
  { name: "GraphQL", icon: "graphql", category: "backend", proficiency: 80 },
  { name: "Docker", icon: "docker", category: "tools", proficiency: 82 },
  { name: "Git", icon: "git", category: "tools", proficiency: 92 },
  { name: "AWS", icon: "aws", category: "tools", proficiency: 72 },
  { name: "Vercel", icon: "vercel", category: "tools", proficiency: 88 },
  { name: "Figma", icon: "figma", category: "tools", proficiency: 70 },
  { name: "Linux", icon: "linux", category: "tools", proficiency: 80 },
];

const categories = [
  { value: "all", label: "All" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "languages", label: "Languages" },
  { value: "tools", label: "Tools" },
];

function SkillBadge({ skill, index }: { skill: TechSkill; index: number }) {
  const Icon = iconMap[skill.icon];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="hover-elevate active-elevate-2 overflow-visible" data-testid={`badge-skill-${skill.icon}`}>
        <CardContent className="p-4 flex flex-col items-center gap-3 text-center">
          {Icon && <Icon className="w-7 h-7 text-primary" />}
          <div>
            <p className="text-sm font-medium">{skill.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{skill.category}</p>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <motion.div
              className="bg-primary rounded-full h-1.5"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.proficiency}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.05 + 0.2 }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 sm:py-28" data-testid="section-skills">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="mb-4 font-mono text-xs">
            Tech Stack
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Technologies I use daily to build scalable, maintainable web applications.
          </p>
        </motion.div>

        <Tabs defaultValue="all">
          <div className="flex justify-center mb-8">
            <TabsList>
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.value}
                  value={cat.value}
                  data-testid={`tab-skill-${cat.value}`}
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((cat) => (
            <TabsContent key={cat.value} value={cat.value}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {skills
                  .filter((s) => cat.value === "all" || s.category === cat.value)
                  .map((skill, i) => (
                    <SkillBadge key={skill.icon} skill={skill} index={i} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
