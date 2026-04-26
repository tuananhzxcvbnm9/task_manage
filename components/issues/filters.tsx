"use client";

import { Input } from "@/components/ui/input";
import { IssueFilters as FilterType, IssuePriority, IssueStatus } from "@/lib/types";

export function Filters({ value, search, assignees, onChange, onSearch }: { value: FilterType; search: string; assignees: string[]; onChange: (v: FilterType) => void; onSearch: (v: string) => void }) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      <Input placeholder="Search issues... (/ to focus)" value={search} onChange={(e) => onSearch(e.target.value)} id="search-input" />
      <select className="h-9 rounded-md border border-input bg-background px-3 text-sm" value={value.status ?? ""} onChange={(e) => onChange({ ...value, status: (e.target.value || undefined) as IssueStatus | undefined })}>
        <option value="">All status</option><option value="todo">To Do</option><option value="in_progress">In Progress</option><option value="review">Review</option><option value="done">Done</option>
      </select>
      <select className="h-9 rounded-md border border-input bg-background px-3 text-sm" value={value.priority ?? ""} onChange={(e) => onChange({ ...value, priority: (e.target.value || undefined) as IssuePriority | undefined })}>
        <option value="">All priority</option><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option>
      </select>
      <select className="h-9 rounded-md border border-input bg-background px-3 text-sm" value={value.assignee ?? ""} onChange={(e) => onChange({ ...value, assignee: e.target.value || undefined })}>
        <option value="">All assignees</option>{assignees.map((a) => <option key={a} value={a}>{a}</option>)}
      </select>
    </div>
  );
}
