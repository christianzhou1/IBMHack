export const mails = [
  {
    id: "email001",
    sender: "Rachel Lin <rachel.lin@company.com>",
    subject: "URGENT: Prepare audit summary from attached financials by Friday",
    body: "Hi,\n\nCan you please review the attached Q4 Financials and compile a summary report by **this Friday, 4 PM EST**? Include only discrepancies greater than $1,000.\n\nNote: Ignore the 'Archived_Transactions.csv' — it's outdated. Prioritize the 'Vendor_Reconciliation.xlsx'. Also, I’ll be OOO on Thursday.\n\nPlease email your findings in bullet point format as a reply.\n\nThanks,\nRachel",
    attachments: [
      {
        filename: "Q4_Transactions.csv",
        filetype: "csv",
        content: "<filepath_or_base64>",
        summary_hint: "include",
      },
      {
        filename: "Vendor_Reconciliation.xlsx",
        filetype: "xlsx",
        content: "<filepath_or_base64>",
        summary_hint: "high_priority",
      },
      {
        filename: "Archived_Transactions.csv",
        filetype: "csv",
        content: "<filepath_or_base64>",
        summary_hint: "ignore",
      },
    ],
    timestamp: "2025-04-29T09:30:00-04:00",
    deadline: "2025-05-02T16:00:00-04:00",
    metadata: {
      priority: "high",
      special_instructions: [
        "Ignore 'Archived_Transactions.csv'",
        "Prioritize Vendor_Reconciliation",
        "Bullet-point summary only",
        "Sender out of office on Thursday",
      ],
      status: "pending",
    },
    read: false,
    labels: ["work", "budget"],
  },
  {
    id: "email002",
    sender: "Kevin Zhou <kzhou@creativeplus.io>",
    subject: "Review attached drafts and finalize 3-page brochure by May 5",
    body: "Hey,\n\nAttached are the design draft (PNG) and content brief (DOCX) for the upcoming product brochure. Could you finalize a 3-page PDF based on these?\n\nImportant:\n- Focus only on **pages 1 and 2** of the content brief. Page 3 is outdated.\n- Use consistent tone and match brand style (refer to last year’s brochure).\n- Deliver in PDF format. Upload to shared drive and reply here with the link.\n\nLet me know if you need a refresher on our branding guide.\n\nThanks!\nKevin",
    attachments: [
      {
        filename: "Brochure_Design_Draft.png",
        filetype: "png",
        content: "<filepath_or_base64>",
        summary_hint: "visual_context",
      },
      {
        filename: "Content_Brief.docx",
        filetype: "docx",
        content: "<filepath_or_base64>",
        summary_hint: "include_pages_1_2",
      },
      {
        filename: "Old_Brochure_2024.pdf",
        filetype: "pdf",
        content: "<filepath_or_base64>",
        summary_hint: "reference",
      },
    ],
    timestamp: "2025-04-28T13:45:00-04:00",
    deadline: "2025-05-05T12:00:00-04:00",
    metadata: {
      priority: "medium",
      special_instructions: [
        "Ignore page 3 of content brief",
        "Deliver final PDF to shared drive",
        "Maintain consistent tone and style",
      ],
      status: "pending",
    },
    read: true,
    labels: ["work", "creative"],
  },
];
export type Mail = (typeof mails)[number];

export const accounts = [
  {
    label: "Alicia Koch",
    email: "alicia@example.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Vercel</title>
        <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Alicia Koch",
    email: "alicia@example.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Gmail</title>
        <path
          d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Alicia Koch",
    email: "alicia@example.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>iCloud</title>
        <path
          d="M13.762 4.29a6.51 6.51 0 0 0-5.669 3.332 3.571 3.571 0 0 0-1.558-.36 3.571 3.571 0 0 0-3.516 3A4.918 4.918 0 0 0 0 14.796a4.918 4.918 0 0 0 4.92 4.914 4.93 4.93 0 0 0 .617-.045h14.42c2.305-.272 4.041-2.258 4.043-4.589v-.009a4.594 4.594 0 0 0-3.727-4.508 6.51 6.51 0 0 0-6.511-6.27z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export type Account = (typeof accounts)[number];

export const contacts = [
  {
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
  },
  {
    name: "Liam Wilson",
    email: "liam.wilson@example.com",
  },
  {
    name: "Olivia Davis",
    email: "olivia.davis@example.com",
  },
  {
    name: "Noah Martinez",
    email: "noah.martinez@example.com",
  },
  {
    name: "Ava Taylor",
    email: "ava.taylor@example.com",
  },
  {
    name: "Lucas Brown",
    email: "lucas.brown@example.com",
  },
  {
    name: "Sophia Smith",
    email: "sophia.smith@example.com",
  },
  {
    name: "Ethan Wilson",
    email: "ethan.wilson@example.com",
  },
  {
    name: "Isabella Jackson",
    email: "isabella.jackson@example.com",
  },
  {
    name: "Mia Clark",
    email: "mia.clark@example.com",
  },
  {
    name: "Mason Lee",
    email: "mason.lee@example.com",
  },
  {
    name: "Layla Harris",
    email: "layla.harris@example.com",
  },
  {
    name: "William Anderson",
    email: "william.anderson@example.com",
  },
  {
    name: "Ella White",
    email: "ella.white@example.com",
  },
  {
    name: "James Thomas",
    email: "james.thomas@example.com",
  },
  {
    name: "Harper Lewis",
    email: "harper.lewis@example.com",
  },
  {
    name: "Benjamin Moore",
    email: "benjamin.moore@example.com",
  },
  {
    name: "Aria Hall",
    email: "aria.hall@example.com",
  },
  {
    name: "Henry Turner",
    email: "henry.turner@example.com",
  },
  {
    name: "Scarlett Adams",
    email: "scarlett.adams@example.com",
  },
];

export type Contact = (typeof contacts)[number];
