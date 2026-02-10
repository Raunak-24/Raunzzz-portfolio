import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Calendar } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-28" data-testid="section-contact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="mb-4 font-mono text-xs">
            Contact
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            I'm always open to discussing new opportunities, interesting projects,
            or ways to collaborate.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="overflow-visible">
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium">alex@devportfolio.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium">San Francisco, CA</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Availability</p>
                      <p className="text-sm font-medium">Open to new roles</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10">
                      <SiGithub className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">GitHub</p>
                      <p className="text-sm font-medium">@alexchen</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6 flex flex-wrap items-center justify-center gap-3 w-full">
                  <Button asChild data-testid="button-email-me">
                    <a href="mailto:alex@devportfolio.com">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </a>
                  </Button>
                  <Button variant="outline" asChild data-testid="button-github-contact">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                      <SiGithub className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" asChild data-testid="button-linkedin-contact">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      <SiLinkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
