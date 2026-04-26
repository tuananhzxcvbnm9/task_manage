"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { useIssueStore } from "@/lib/issue-store";

export default function ProjectsPage() {
  const { projects, issues, loading } = useIssueStore();

  return (
    <AppShell>
      <h2 className="mb-4 text-lg font-semibold">Projects</h2>
      {loading ? <div className="rounded-lg border p-8 text-sm text-muted-foreground">Loading projects...</div> : (
        <div className="grid gap-3 md:grid-cols-2">
          {projects.map((project) => {
            const scoped = issues.filter((issue) => issue.projectId === project.id);
            const done = scoped.filter((issue) => issue.status === "done").length;
            const progress = scoped.length ? Math.round((done / scoped.length) * 100) : 0;
            return (
              <Card key={project.id} className="p-4">
                <h3 className="font-semibold">{project.name}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{project.description}</p>
                <div className="h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} /></div>
                <p className="mt-2 text-xs text-muted-foreground">{done}/{scoped.length} done ({progress}%)</p>
              </Card>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
