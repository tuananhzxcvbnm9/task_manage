"use client";

import { notFound, useParams } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { IssueForm } from "@/components/issues/issue-form";
import { Button } from "@/components/ui/button";
import { useIssueStore } from "@/lib/issue-store";

export default function IssueDetailPage() {
  const params = useParams<{ id: string }>();
  const { getIssueById, updateIssue, deleteIssue } = useIssueStore();
  const issue = getIssueById(params.id);

  if (!issue) return notFound();

  return (
    <AppShell>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs text-muted-foreground">{issue.id}</p>
          <h2 className="text-xl font-semibold">{issue.title}</h2>
        </div>
        <div className="flex gap-2">
          <IssueForm triggerLabel="Edit" initial={issue} onSubmit={(data) => updateIssue(issue.id, data)} />
          <Button onClick={() => deleteIssue(issue.id)}>Delete</Button>
        </div>
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="space-y-3 p-4 lg:col-span-2">
          <p className="text-sm">{issue.description}</p>
          <div className="flex flex-wrap gap-2">
            <Badge>{issue.status}</Badge><Badge>{issue.priority}</Badge><Badge>{issue.assignee}</Badge>
            {issue.labels.map((label) => <Badge key={label}>#{label}</Badge>)}
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">Comments</h3>
            {issue.comments.length === 0 ? <p className="text-sm text-muted-foreground">No comments yet.</p> : issue.comments.map((comment) => (
              <div key={comment.id} className="mb-2 rounded-md border p-2 text-sm"><p className="font-medium">{comment.author}</p><p>{comment.body}</p></div>
            ))}
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="mb-2 text-sm font-semibold">Activity log</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {issue.activity.map((item) => <li key={item.id}>• {item.text} — {item.createdAt}</li>)}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
