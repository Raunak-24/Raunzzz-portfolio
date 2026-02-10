import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Mail, FileText, MapPin } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { motion } from "framer-motion";

const typingTexts = [
  "Full-Stack Developer",
  "React Specialist",
  "Open Source Contributor",
  "UI/UX Enthusiast",
];

export function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFull = typingTexts[currentTextIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentFull.length) {
            setDisplayText(currentFull.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(currentFull.slice(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center relative pt-16"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent dark:from-primary/10" />

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-chart-2/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="font-mono text-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 mr-2" />
              Available for opportunities
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-primary">Alex Chen</span>
          </motion.h1>

          <motion.div
            className="h-8 sm:h-10 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="font-mono text-lg sm:text-xl md:text-2xl text-muted-foreground">
              {">"} {displayText}
              <span className="animate-typing-cursor text-primary">|</span>
            </span>
          </motion.div>

          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            data-testid="text-hero-description"
          >
            I build elegant, performant web applications with modern technologies.
            Passionate about clean code, open source, and creating delightful user experiences.
          </motion.p>

          <motion.div
            className="flex items-center gap-2 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>San Francisco, CA</span>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mt-2 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button onClick={() => scrollTo("#projects")} data-testid="button-view-work">
              View My Work
              <ArrowDown className="w-4 h-4 ml-1" />
            </Button>
            <Button variant="outline" onClick={() => scrollTo("#contact")} data-testid="button-contact">
              <Mail className="w-4 h-4 mr-1" />
              Get In Touch
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-2 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              size="icon"
              variant="ghost"
              asChild
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" data-testid="link-github">
                <SiGithub className="w-4 h-4" />
              </a>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              asChild
            >
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" data-testid="link-linkedin">
                <SiLinkedin className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
