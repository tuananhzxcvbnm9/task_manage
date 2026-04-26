import { Issue, Project } from "@/lib/types";

export const projects: Project[] = [
  { id: "p1", name: "Workspace Core", description: "Core experience for issue management." },
  { id: "p2", name: "Growth", description: "Onboarding and activation improvements." }
];

export const initialIssues: Issue[] = [
  {
    id: "ISS-101",
    title: "Add command palette skeleton",
    description: "Create keyboard-first command palette with quick actions.",
    status: "in_progress",
    priority: "high",
    assignee: "An",
    labels: ["frontend", "ux"],
    dueDate: "2026-05-02",
    projectId: "p1",
    comments: [{ id: "c1", author: "Linh", body: "Need shortcut hint in header.", createdAt: "2026-04-24" }],
    activity: [{ id: "a1", text: "Moved to In Progress", createdAt: "2026-04-23" }]
  },
  {
    id: "ISS-102",
    title: "Finalize issue detail layout",
    description: "Balance comment stream and activity timeline for large issues.",
    status: "review",
    priority: "medium",
    assignee: "Minh",
    labels: ["design"],
    dueDate: "2026-05-01",
    projectId: "p1",
    comments: [],
    activity: [{ id: "a2", text: "Opened pull request", createdAt: "2026-04-25" }]
  },
  {
    id: "ISS-103",
    title: "Project progress aggregation",
    description: "Compute progress per project based on completed tasks.",
    status: "todo",
    priority: "urgent",
    assignee: "Huy",
    labels: ["backend", "metrics"],
    dueDate: "2026-05-04",
    projectId: "p2",
    comments: [],
    activity: [{ id: "a3", text: "Created issue", createdAt: "2026-04-26" }]
  },
  {
    id: "ISS-104",
    title: "Dark mode contrast polish",
    description: "Improve contrast for badges and table rows in dark theme.",
    status: "done",
    priority: "low",
    assignee: "An",
    labels: ["ui"],
    dueDate: "2026-04-29",
    projectId: "p2",
    comments: [{ id: "c2", author: "Minh", body: "Looks good on OLED screens.", createdAt: "2026-04-25" }],
    activity: [{ id: "a4", text: "Marked as Done", createdAt: "2026-04-25" }]
  }
];
