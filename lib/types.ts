export type IssueStatus = "todo" | "in_progress" | "review" | "done";
export type IssuePriority = "low" | "medium" | "high" | "urgent";

export interface Comment {
  id: string;
  author: string;
  body: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  text: string;
  createdAt: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  assignee: string;
  labels: string[];
  dueDate?: string;
  projectId: string;
  comments: Comment[];
  activity: Activity[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface IssueFilters {
  status?: IssueStatus;
  priority?: IssuePriority;
  assignee?: string;
}
