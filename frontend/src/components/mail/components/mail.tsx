import * as React from "react";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/new-york/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/new-york/resizable";
import { Separator } from "@/components/ui/new-york/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/new-york/tabs";
import { TooltipProvider } from "@/components/ui/new-york/tooltip";
import { AccountSwitcher } from "@/components/mail/components/account-switcher";
import { MailDisplay } from "@/components/mail/components/mail-display";
import { MailList } from "@/components/mail/components/mail-list";
import { GranitePanel } from "@/components/granite/granite-panel";
import { DashboardPanel } from "@/components/dashboard/dashboard-panel";
import { Nav } from "@/components/mail/components/nav";
import { type Mail } from "@/types/mail";
import { useMail } from "@/components/mail/use-mail";
/* import { type Task } from "@/types/task"; */
import { useTasks } from "@/hooks/use-tasks";
/* import { Spinner } from "@/components/ui/new-york/spinner";
 */
interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Mail({
  accounts,
  mails,
  defaultLayout = [0, 30, 45, 45],
  defaultCollapsed = true,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useMail();
  const { tasks, isLoading, error, fetchTasks } = useTasks(mails);
  React.useEffect(() => {
    if (process.env.NODE_ENV != "development") {
      fetchTasks();
    }
  }, [fetchTasks]);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`;
        }}
        className="flex-1 max-h-screen w-screen items-stretch"
      >
        {/* Nav Panel */}
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onResize={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Inbox",
                label: "128",
                icon: Inbox,
                variant: "default",
              },
              {
                title: "Drafts",
                label: "9",
                icon: File,
                variant: "ghost",
              },
              {
                title: "Sent",
                label: "",
                icon: Send,
                variant: "ghost",
              },
              {
                title: "Junk",
                label: "23",
                icon: ArchiveX,
                variant: "ghost",
              },
              {
                title: "Trash",
                label: "",
                icon: Trash2,
                variant: "ghost",
              },
              {
                title: "Archive",
                label: "",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Social",
                label: "972",
                icon: Users2,
                variant: "ghost",
              },
              {
                title: "Updates",
                label: "342",
                icon: AlertCircle,
                variant: "ghost",
              },
              {
                title: "Forums",
                label: "128",
                icon: MessagesSquare,
                variant: "ghost",
              },
              {
                title: "Shopping",
                label: "8",
                icon: ShoppingCart,
                variant: "ghost",
              },
              {
                title: "Promotions",
                label: "21",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle />
        {/* Dashboard Panel */}
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={25}>
          <DashboardPanel tasks={tasks} mails={mails} />
        </ResizablePanel>
        <ResizableHandle />
        {/* Granite Panel */}
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={25}>
          <GranitePanel
            mail={mails.find((item) => item.id === mail.selected) || null}
          />
        </ResizablePanel>
        <ResizableHandle />
        {/* Mail Display and Mail List */}
        <ResizablePanel
          defaultSize={defaultLayout[3]}
          minSize={30}
          className="flex flex-col h-screen overflow-y-auto"
        >
          <ResizablePanelGroup direction="vertical">
            {/* Mail List Panel */}
            <ResizablePanel
              defaultSize={40}
              minSize={20}
              className="flex flex-col h-full overflow-auto"
            >
              <Tabs defaultValue="all">
                <div className="flex items-center px-4 py-2">
                  <h1 className="text-xl font-bold">Inbox</h1>
                  <TabsList className="ml-auto">
                    <TabsTrigger
                      value="all"
                      className="text-zinc-600 dark:text-zinc-200"
                    >
                      All mail
                    </TabsTrigger>
                    <TabsTrigger
                      value="unread"
                      className="text-zinc-600 dark:text-zinc-200"
                    >
                      Unread
                    </TabsTrigger>
                  </TabsList>
                </div>
                <Separator />
                <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <form>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search" className="pl-8" />
                    </div>
                  </form>
                </div>
                {/* Make sure the container for TabsContent is flexible and scrollable */}
                <div className="flex-1 flex-col h-full overflow-y-auto">
                  <div className="flex-1 flex-col h-full overflow-y-auto">
                    <TabsContent
                      value="all"
                      className="flex-1 flex-col h-80 overflow-y-auto m-0"
                    >
                      <MailList items={mails} />
                    </TabsContent>
                    <TabsContent
                      value="unread"
                      className="flex-1 flex-col h-80 overflow-y-auto m-0"
                    >
                      <MailList items={mails.filter((item) => !item.read)} />
                    </TabsContent>
                  </div>
                </div>
              </Tabs>
            </ResizablePanel>
            <ResizableHandle />
            {/* Mail Display (Top Half) */}
            <ResizablePanel defaultSize={60} minSize={40}>
              <MailDisplay
                mail={mails.find((item) => item.id === mail.selected) || null}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
