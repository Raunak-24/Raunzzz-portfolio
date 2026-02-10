import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Code, Play, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@shared/schema";

const projects: Project[] = [
  {
    id: "1",
    title: "Resume Screening & Ranking System",
    description: "An AI-powered system that parses resumes using NLP, extracts key skills, and ranks candidates based on job descriptions.",
    image: "/images/project-resume.png",
    tags: ["Python", "NLP", "Scikit-learn", "Flask", "Pandas"],
    codeUrl: "https://github.com",
    featured: true,
  },
  {
    id: "2",
    title: "Emotion Detection from Facial Expressions",
    description: "Real-time emotion recognition using Deep Learning (CNNs) to detect human emotions like happy, sad, angry, and neutral from video feeds.",
    image: "/images/project-emotion.png",
    tags: ["Python", "TensorFlow", "Keras", "OpenCV"],
    codeUrl: "https://github.com",
    featured: true,
  },
  {
    id: "3",
    title: "Face Recognition Attendance System",
    description: "An automated attendance system that recognizes students/employees using LBPH algorithms and logs attendance in real-time.",
    image: "/images/project-attendance.png",
    tags: ["Python", "OpenCV", "SQLite", "NumPy"],
    codeUrl: "https://github.com",
    featured: true,
  },
  {
    id: "4",
    title: "Personal Portfolio-builder Website",
    description: "A dynamic web application that allows users to create, customize, and host their professional portfolios with ease.",
    image: "/images/project-builder.png",
    tags: ["React", "Node.js", "MongoDB", "TailwindCSS"],
    liveUrl: "https://example.com",
    codeUrl: "https://github.com",
    featured: false,
  },
  {
    id: "5",
    title: "License Plate Recognition System",
    description: "An automated vehicle tracking system that extracts characters from license plates using OCR and edge detection techniques.",
    image: "/images/project-license.png",
    tags: ["Python", "OpenCV", "Tesseract OCR", "Matplotlib"],
    codeUrl: "https://github.com",
    featured: false,
  },
];

const categories = ["All", "Featured", "Live Demo", "Open Source"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="group overflow-visible"
        data-testid={`card-project-${project.id}`}
      >
        <div className="relative aspect-video bg-muted rounded-t-md overflow-hidden">
          {showDemo && project.codePenUrl ? (
            <div className="absolute inset-0 bg-card flex items-center justify-center">
              <div className="text-center p-6">
                <Play className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-3">
                  Live demo would load here
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowDemo(false)}
                  data-testid={`button-close-demo-${project.id}`}
                >
                  Close Preview
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 via-chart-2/10 to-chart-5/20 flex items-center justify-center"
              >
                <div className="text-center">
                  <Code className="w-8 h-8 text-primary/60 mx-auto mb-2" />
                  <span className="font-mono text-xs text-muted-foreground">
                    {project.title}
                  </span>
                </div>
              </div>
              {project.codePenUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    onClick={() => setShowDemo(true)}
                    data-testid={`button-demo-${project.id}`}
                  >
                    <Play className="w-3.5 h-3.5 mr-1" />
                    Live Demo
                  </Button>
                </div>
              )}
            </>
          )}
          {project.featured && (
            <div className="absolute top-2 right-2">
              <Badge variant="default" className="text-xs">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4 space-y-3">
          <h3 className="font-semibold text-base" data-testid={`text-project-title-${project.id}`}>
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-mono">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {project.liveUrl && (
              <Button size="sm" variant="outline" asChild>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-live-${project.id}`}
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1" />
                  Live
                </a>
              </Button>
            )}
            {project.codeUrl && (
              <Button size="sm" variant="outline" asChild>
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-code-${project.id}`}
                >
                  <Code className="w-3.5 h-3.5 mr-1" />
                  Code
                </a>
              </Button>
            )}
            {project.codePenUrl && (
              <Button size="sm" variant="outline" asChild>
                <a
                  href={project.codePenUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-codepen-${project.id}`}
                >
                  <Play className="w-3.5 h-3.5 mr-1" />
                  CodePen
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = useState("All");

  const filtered = projects.filter((p) => {
    if (filter === "Featured") return p.featured;
    if (filter === "Live Demo") return p.codePenUrl || p.liveUrl;
    if (filter === "Open Source") return p.codeUrl;
    return true;
  });

  return (
    <section id="projects" className="py-20 sm:py-28" data-testid="section-projects">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="mb-4 font-mono text-xs">
            Projects
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Things I've Built
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            A collection of specialized systems and web applications showcasing my expertise in AI, Computer Vision, and Full-Stack Development.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList>
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  data-testid={`tab-filter-${cat.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
