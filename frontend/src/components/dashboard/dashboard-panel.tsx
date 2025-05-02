import { ScrollArea } from "@/components/ui/default/scroll-area";
import { Badge } from "@/components/ui/default/badge";
import { Mail } from "@/types/mail";
import { Task } from "@/types/task";

interface DashboardPanelProps {
  tasks: Task[];
  mails: Mail[];
}

export function DashboardPanel({ tasks, mails }: DashboardPanelProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">📋 Task Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Grouped by relevance and AI task context
        </p>
      </div>

      <ScrollArea className="flex-1 px-4 py-3 space-y-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border rounded-lg p-4 bg-muted/10 shadow-sm"
          >
            <h3 className="text-md font-semibold mb-1">{task.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              📧 Related emails: {task.emailIds.join(", ")}
            </p>

            {/* Render attachments for this task */}
            <div className="space-y-2">
              {task.attachments.map((att, i) => {
                const mail = mails.find((m) => m.id === att.emailId);
                const sender = mail?.sender.split("<")[0].trim();

                return (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm bg-white border rounded px-3 py-2"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{att.filename}</span>
                      <span className="text-xs text-muted-foreground">
                        from {sender} ({att.filetype})
                      </span>
                    </div>
                    <Badge variant="outline" className="capitalize text-xs">
                      {att.priority}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
