import { useEffect, useState } from "react";
import { Mail } from "@/components/mail/components/mail";
import { accounts, mails } from "@/components/mail/data";

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match?.[2];
}

export default function MailPage() {
  const [defaultLayout, setDefaultLayout] = useState();
  const [defaultCollapsed, setDefaultCollapsed] = useState();

  useEffect(() => {
    const layout = getCookie("react-resizable-panels:layout:mail");
    const collapsed = getCookie("react-resizable-panels:collapsed");
    if (layout) setDefaultLayout(JSON.parse(layout));
    if (collapsed) setDefaultCollapsed(JSON.parse(collapsed));
  }, []);

  return (
    <div className="h-screen w-screen">
      <div className="md:hidden">{/* Mobile fallback UI */}</div>
      <div className="h-screen md:flex">
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </div>
  );
}
