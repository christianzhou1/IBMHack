import React from "react";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "@/components/ui/new-york/scroll-area";
/* import { Separator } from "@/components/ui/new-york/separator"; */
import { Textarea } from "@/components/ui/new-york/textarea";
import { Button } from "@/components/ui/new-york/button";
import { Mail } from "@/components/mail/data/data";
import { Badge } from "@/components/ui/new-york/badge";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

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
  You are an email assistant embedded in a productivity app. You are helping the user understand and act on a specific email and its attachments.
  
  You have access to:
  - The email's subject, sender, body, and metadata
  - A list of attachment names and the extracted text from each
  - A deadline and task priority if available
  
  Your goal is to:
  - Answer questions only based on the information provided
  - Never guess beyond the email or attachments
  - Help the user identify the task, understand the request, or break down next steps
  
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
  - Steps the user can follow to begin

  Only use the information from the email and attachments.
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
      <div className="p-4 border-b">
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
      <div className="flex flex-col flex-1 overflow-hidden">
        <ScrollArea className="flex-1 p-4 space-y-2">
          {messages.map((msg, i) => (
            <div className="prose prose-sm dark:prose-invert bg-slate-100 border border-[#ddd3b1] text-muted-foreground p-4 rounded-md mb-2 shadow-md">
              <ReactMarkdown key={i}>{msg}</ReactMarkdown>
            </div>
          ))}
        </ScrollArea>

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
