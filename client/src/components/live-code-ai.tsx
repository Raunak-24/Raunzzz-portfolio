import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export function LiveCodeAI() {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(""); // ✅ Add error state

  async function analyzeCode() {
    if (!code.trim()) return;
    setLoading(true);
    setError(""); // Reset error
    setResponse(""); // Reset response

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      // ✅ Check if response is ok
      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || `Error: ${res.status}`);
        setLoading(false);
        setOpen(true);
        return;
      }

      const data = await res.json();

      // ✅ Check if explanation exists
      if (data.error) {
        setError(data.error);
      } else if (data.explanation) {
        setResponse(data.explanation);
      } else {
        setError("No response from AI");
      }

      setLoading(false);
      setOpen(true);
    } catch (err) {
      // ✅ Catch network errors
      setError(`Failed to analyze: ${err instanceof Error ? err.message : "Unknown error"}`);
      setLoading(false);
      setOpen(true);
    }
  }

  return (
    <section id="live-code" className="py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3">Live Code</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold">
            AI Code Analyzer
          </h2>
          <p className="text-muted-foreground mt-2">
            Paste any code. AI will understand and explain it.
          </p>
        </div>

        <Card>
          <CardContent className="p-4 space-y-4">
            <Textarea
              placeholder="Paste any code (JS, Python, C++, Java, etc.)"
              className="min-h-[220px] font-mono"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <Button onClick={analyzeCode} disabled={loading || !code.trim()}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {loading ? "Analyzing..." : "Analyze Code"}
            </Button>
          </CardContent>
        </Card>

        {/* OUTPUT MODAL */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {error ? "Error" : "AI Explanation"}
              </DialogTitle>
            </DialogHeader>
            {error ? (
              <div className="text-red-500 font-semibold p-4 bg-red-50 rounded">
                {error}
              </div>
            ) : (
              <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
                {response}
              </pre>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
