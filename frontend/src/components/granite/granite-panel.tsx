import React from "react";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScrollArea } from "@/components/ui/new-york/scroll-area";
/* import { Separator } from "@/components/ui/new-york/separator"; */
import { Textarea } from "@/components/ui/new-york/textarea";
import { Button } from "@/components/ui/new-york/button";
import { Mail } from "@/types/mail";
import { Badge } from "@/components/ui/new-york/badge";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { TypingDots } from "@/components/ui/typing-dots";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/new-york/card";
import { cn } from "@/lib/utils";

interface GranitePanelProps {
  mail: Mail | null;
}

export function GranitePanel({ mail }: GranitePanelProps) {
  const [messages, setMessages] = React.useState<
    { role: "user" | "ai"; content: string }[]
  >([
    { role: "user", content: "1" },
    { role: "ai", content: "1" },
    { role: "user", content: "1" },
    { role: "ai", content: "1" },
    { role: "user", content: "1" },
    {
      role: "user",
      content: `# header
      
      Your goal is to:
      
  - Answer questions only based on the information provided
  - Never guess beyond the email or attachments
  - Help the user identify the task, understand the request, or break down next steps
  - Address the user in second person (you)`,
    },
    { role: "user", content: "1" },
    { role: "user", content: "1" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!mail)
    return <div className="p-4 text-muted-foreground">No email selected</div>;

  /*   const sendMessage = async (message: string) => {
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/watsonx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: message }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: data.response || "Error: No response" },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Error: failed to fetch response." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }; */

  const sendMessage = async (input: string) => {
    if (!input.trim() || !mail) return;

    const prompt = `
  You are an email assistant embedded in a productivity app. You are helping the user understand and act on a specific email and its attachments.
  
  You have access to:
  - The email's subject, sender, body, and metadata
  - A list of attachment names and the extracted text from each
  - A deadline and task priority if available
  
  Your goal is to:
  - Answer questions only based on the information provided
  - Never guess beyond the email or attachments
  - Help the user identify the task, understand the request, or break down next steps
  - Address the user in second person (you)
  
  Here is the data:
  
  ---
  
  📬 Email Metadata:
  Subject: ${mail.subject}
  Sender: ${mail.sender}
  Sent at: ${mail.timestamp}
  
  📄 Email Body:
  ${mail.body}
  
  📎 Attachments:
  ${mail.attachments
    .map((a) => `- ${a.filename} (${a.filetype})\n `)
    .join("\n\n")}
  
  📅 Deadline: ${mail.deadline ?? "Not specified"}
  ⭐ Priority: ${mail.metadata.priority ?? "Not specified"}
  
  ---
  
  User's question: "${input}"
  
  Provide a clear, multi-paragraph response that includes:
  - What the task is
  - What to focus on in the attachments
  - Any deadlines, formatting, or delivery instructions
  - Steps the user can follow to begin, preferably in bullet points or numbered lists

  Only use facts from the email and attachments. Do not make assumptions or guesses. Ask clarifying questions if needed.
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
        setMessages((prev) => [...prev, { role: "ai", content: data.error }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "ai", content: data.response },
        ]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Unknown error" },
      ]);
    }

    setIsLoading(false);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col bg-muted/10 cursor-default">
      {/* Email Info */}
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold">Granite Summary</h2>
        <div className="flex flex-col gap-2 mt-2 transition-all">
          <Badge variant="outline" className="text-md">
            Subject: {mail.subject}
          </Badge>
          <Badge variant="outline" className="text-md">
            From: {mail.sender}
          </Badge>
          <Badge variant="outline" className="text-md">
            {formatDistanceToNow(new Date(mail.timestamp), {
              addSuffix: true,
            })}
          </Badge>

          {/* <p className="text-md text-foreground">Subject: {mail.subject}</p> */}
          {/* <p className="text-md text-foreground">From: {mail.sender}</p> */}
          {/* <p className="text-md text-foreground">
          Attachments: {mail.attachments.length}
        </p> */}
        </div>
      </div>

      {/* Attachments */}
      <div className="p-4 border-b overflow-x-auto">
        <div className="flex flex-col gap-2 text-lg font-semibold">
          Attachments
          {mail.attachments.length ? (
            <div className="text-md flex flex-row gap-2">
              {mail.attachments.map((a) => (
                <Badge
                  key={a.filename}
                  variant="outline"
                  className="text-md transition-all p-2 flex-col items-start hover:bg-muted"
                >
                  <div>{a.filename}</div>
                  <div className="text-muted-foreground font-normal">
                    {a.filetype} file
                  </div>
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col h-full mb-2 overflow-y-hidden">
        {/* Scrollable messages area */}
        <ScrollArea className="flex-1 flex-col px-4 py-3 space-y-3 mb-2 overflow-y-hidden">
          {messages.map((msg, i) => (
            <div
              className={cn(
                "flex flex-row w-full",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <Card
                className={cn(
                  "mb-2 w-1/2",
                  msg.role === "user" ? "bg-blue-100" : "bg-muted"
                )}
              >
                <CardContent>
                  <div className="prose">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}

          {isLoading && (
            <div className="mr-auto bg-muted text-left text-muted-foreground px-4 py-2 rounded-md text-sm">
              <TypingDots />
            </div>
          )}
        </ScrollArea>

        {/* Text input and send button */}
        <div className="p-3 border-t flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (input.trim()) sendMessage(input);
              }
            }}
            placeholder="Ask about this email..."
            className="flex-1 resize-none"
            rows={2}
          />
          <Button
            onClick={() => {
              if (input.trim()) {
                sendMessage(input);
                setIsLoading(true);
                setMessages((prev) => {
                  return [...prev, { role: "user", content: input }];
                });
              }
            }}
            disabled={isLoading}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
