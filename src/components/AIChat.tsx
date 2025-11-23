import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, X, Send } from "lucide-react";

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ from: string; text: string }>>([]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    // placeholder: echo response
    setTimeout(() => {
      setMessages((m) => [...m, { from: "ai", text: `Thanks — I received: "${userMsg.text}"` }]);
    }, 600);
  };

  return (
    <div>
      {/* Floating Button */}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end">
        {open && (
          <div className="w-80 max-w-sm mb-3 bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">NapFi Brain</div>
                  <div className="text-xs text-muted-foreground">Ask anything about deployments</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-3 max-h-64 overflow-y-auto space-y-3">
              {messages.length === 0 && (
                <div className="text-sm text-muted-foreground">Hi — how can I help with Deployments or Tokens?</div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={m.from === 'user' ? 'text-right' : 'text-left'}>
                  <div className={m.from === 'user' ? 'inline-block bg-primary/20 text-primary px-3 py-1 rounded-lg' : 'inline-block bg-muted/20 px-3 py-1 rounded-lg'}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
                placeholder="Ask NapFi Brain..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
              <Button onClick={send}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        <Button
          onClick={() => setOpen(!open)}
          className="rounded-full h-12 w-12 p-0 flex items-center justify-center"
          style={{ boxShadow: '0 8px 24px rgba(59, 166, 255, 0.25)' }}
        >
          <Bot className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
