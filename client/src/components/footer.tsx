import { Code2, Heart } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t py-8" data-testid="footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Code2 className="w-4 h-4 text-primary" />
            <span>Built with React, TypeScript & TailwindCSS</span>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            <Button size="icon" variant="ghost" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" data-testid="link-footer-github">
                <SiGithub className="w-4 h-4" />
              </a>
            </Button>
            <Button size="icon" variant="ghost" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" data-testid="link-footer-linkedin">
                <SiLinkedin className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
