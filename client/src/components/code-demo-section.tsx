import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Play, Copy, Check, Terminal } from "lucide-react";
import { motion } from "framer-motion";

interface CodeDemo {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  output: string;
}

const demos: CodeDemo[] = [
  {
    id: "hook",
    title: "Custom React Hook",
    description: "A reusable useDebounce hook for optimizing search inputs",
    language: "TypeScript",
    code: `function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
const [search, setSearch] = useState("");
const debouncedSearch = useDebounce(search, 300);

useEffect(() => {
  fetchResults(debouncedSearch);
}, [debouncedSearch]);`,
    output: `// Input: "react hooks" (typed quickly)
// After 300ms of no typing:
// fetchResults("react hooks") is called once
// instead of calling for each keystroke`,
  },
  {
    id: "api",
    title: "Express Middleware",
    description: "Rate limiting middleware with sliding window algorithm",
    language: "TypeScript",
    code: `const rateLimit = (
  windowMs: number,
  maxRequests: number
) => {
  const requests = new Map<string, number[]>();

  return (req: Request, res: Response, next: Next) => {
    const key = req.ip || "unknown";
    const now = Date.now();
    const windowStart = now - windowMs;

    const timestamps = (requests.get(key) || [])
      .filter(t => t > windowStart);

    if (timestamps.length >= maxRequests) {
      return res.status(429).json({
        error: "Too many requests",
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }

    timestamps.push(now);
    requests.set(key, timestamps);
    next();
  };
};

app.use("/api", rateLimit(60000, 100));`,
    output: `// Request 1-100: 200 OK
// Request 101:
{
  "error": "Too many requests",
  "retryAfter": 60
}`,
  },
  {
    id: "algo",
    title: "Trie Data Structure",
    description: "Efficient prefix search implementation for autocomplete",
    language: "TypeScript",
    code: `class TrieNode {
  children = new Map<string, TrieNode>();
  isEnd = false;
  word = "";
}

class Trie {
  root = new TrieNode();

  insert(word: string) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEnd = true;
    node.word = word;
  }

  autocomplete(prefix: string, limit = 5) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return [];
      node = node.children.get(char)!;
    }
    return this.collect(node, [], limit);
  }

  private collect(
    node: TrieNode, results: string[], limit: number
  ): string[] {
    if (results.length >= limit) return results;
    if (node.isEnd) results.push(node.word);
    for (const child of node.children.values()) {
      this.collect(child, results, limit);
    }
    return results;
  }
}`,
    output: `const trie = new Trie();
["react", "redux", "relay", "recoil", "remix"]
  .forEach(w => trie.insert(w));

trie.autocomplete("re")
// ["react", "recoil", "redux", "relay", "remix"]

trie.autocomplete("rec")
// ["recoil"]`,
  },
];

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 rounded-t-md border-b">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-mono text-muted-foreground">{language}</span>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleCopy}
          data-testid={`button-copy-code-${language.toLowerCase()}`}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </Button>
      </div>
      <div className="bg-card dark:bg-background rounded-b-md overflow-x-auto">
        <pre className="p-4 text-xs sm:text-sm leading-relaxed font-mono text-foreground">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export function CodeDemoSection() {
  return (
    <section className="py-20 sm:py-28 bg-muted/30" data-testid="section-code-demos">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="mb-4 font-mono text-xs">
            Live Code
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Code Demos
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Interactive code examples demonstrating patterns and techniques I use in my work.
          </p>
        </motion.div>

        <Tabs defaultValue={demos[0].id}>
          <div className="flex justify-center mb-8">
            <TabsList>
              {demos.map((demo) => (
                <TabsTrigger
                  key={demo.id}
                  value={demo.id}
                  data-testid={`tab-demo-${demo.id}`}
                >
                  {demo.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {demos.map((demo) => (
            <TabsContent key={demo.id} value={demo.id}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                  <div className="lg:col-span-3">
                    <Card className="overflow-visible">
                      <CardContent className="p-0">
                        <CodeBlock code={demo.code} language={demo.language} />
                      </CardContent>
                    </Card>
                  </div>

                  <div className="lg:col-span-2 space-y-4">
                    <Card className="overflow-visible">
                      <CardContent className="p-4 space-y-3">
                        <h3 className="font-semibold text-base">{demo.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {demo.description}
                        </p>
                        <Badge variant="secondary" className="font-mono text-xs">
                          {demo.language}
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card className="overflow-visible">
                      <CardContent className="p-0">
                        <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-t-md border-b">
                          <Play className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-xs font-mono text-muted-foreground">Output</span>
                        </div>
                        <pre className="p-4 text-xs sm:text-sm leading-relaxed font-mono text-muted-foreground overflow-x-auto">
                          <code>{demo.output}</code>
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
