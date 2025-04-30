import React from "react";
import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import { Separator } from "@/registry/new-york/ui/separator";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { Button } from "@/registry/new-york/ui/button";
import { Mail } from "@/components/mail/data/data";

interface GranitePanelProps {
  mail: Mail | null;
}

export function GranitePanel({ mail }: GranitePanelProps) {
  const [messages, setMessages] = React.useState<string[]>([]);
  const [input, setInput] = React.useState("");

  if (!mail)
    return <div className="p-4 text-muted-foreground">No email selected</div>;

  const handleSend = async () => {
    if (!input.trim() || !mail) return;

    const prompt = `
      Email Subject: ${mail.subject}
      Sender: ${mail.sender}
      Body: ${mail.body}
      Attachments: ${mail.attachments.map((a) => a.filename).join(", ")}
  
      User question: ${input}
    `;

    try {
      const response = await fetch("/api/watsonx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          `User: ${input}`,
          `AI: Error: ${data.error}`,
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          `User: ${input}`,
          `AI: ${data.response}`,
        ]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setMessages((prev) => [
        ...prev,
        `User: ${input}`,
        `AI: Failed to reach backend: ${err}`,
      ]);
    }

    setInput("");
  };

  return (
    <div className="flex h-full flex-col border-l bg-muted/10">
      {/* Email summary */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Granite Summary</h2>
        <p className="text-sm text-muted-foreground">Subject: {mail.subject}</p>
        <p className="text-sm text-muted-foreground">From: {mail.sender}</p>
        <p className="text-sm text-muted-foreground">
          Attachments: {mail.attachments.length}
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <ScrollArea className="flex-1 p-4 space-y-2">
          {messages.map((msg, i) => (
            <p key={i} className="text-sm whitespace-pre-wrap">
              {msg}
            </p>
          ))}
        </ScrollArea>
        <Separator />
        <div className="p-3 border-t flex gap-2">
          <Textarea
            placeholder="Ask about this email..."
            className="flex-1"
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </div>
    </div>
  );
}
