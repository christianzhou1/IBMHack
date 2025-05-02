export type AttachmentReference = {
  emailId: string;
  filename: string;
  filetype: string;
  priority: "high" | "medium" | "low" | "ignore";
};

export type Task = {
  id: string;
  name: string;
  emailIds: string[];
  attachments: AttachmentReference[];
};
