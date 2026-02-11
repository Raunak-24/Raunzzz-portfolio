import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { CodeDemoSection } from "@/components/code-demo-section";
import { SkillsSection } from "@/components/skills-section";
import { GitHubRepos } from "@/components/GitHubRepos";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ProjectsSection />
        <CodeDemoSection />
        <SkillsSection />
        <GitHubRepos />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
