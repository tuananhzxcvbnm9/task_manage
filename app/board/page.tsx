"use client";

import { AppShell } from "@/components/layout/app-shell";
import { BoardColumn } from "@/components/issues/board-column";
import { useIssueStore } from "@/lib/issue-store";
import { IssueStatus } from "@/lib/types";

const cols: Array<{ title: string; status: IssueStatus }> = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "in_progress" },
  { title: "Review", status: "review" },
  { title: "Done", status: "done" }
];

export default function BoardPage() {
  const { filteredIssues, updateIssue, loading } = useIssueStore();

  return (
    <AppShell>
      <h2 className="mb-4 text-lg font-semibold">Board View</h2>
      {loading ? (
        <div className="rounded-lg border p-8 text-sm text-muted-foreground">Loading board...</div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {cols.map((col) => (
            <BoardColumn key={col.status} title={col.title} status={col.status} issues={filteredIssues.filter((issue) => issue.status === col.status)} onMove={(id, next) => updateIssue(id, { status: next })} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
