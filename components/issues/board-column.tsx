import { IssueCard } from "@/components/issues/issue-card";
import { Button } from "@/components/ui/button";
import { Issue, IssueStatus } from "@/lib/types";

const order: IssueStatus[] = ["todo", "in_progress", "review", "done"];

export function BoardColumn({ title, status, issues, onMove }: { title: string; status: IssueStatus; issues: Issue[]; onMove: (id: string, next: IssueStatus) => void }) {
  const idx = order.indexOf(status);
  return (
    <div className="min-h-[400px] rounded-lg border p-3">
      <h3 className="mb-3 text-sm font-semibold">{title} ({issues.length})</h3>
      <div className="space-y-2">
        {issues.length === 0 && <p className="text-xs text-muted-foreground">No issues</p>}
        {issues.map((issue) => (
          <div key={issue.id} className="space-y-1">
            <IssueCard issue={issue} />
            <div className="flex gap-1">
              {idx > 0 && <Button className="h-7 px-2 text-xs" onClick={() => onMove(issue.id, order[idx - 1])}>←</Button>}
              {idx < order.length - 1 && <Button className="h-7 px-2 text-xs" onClick={() => onMove(issue.id, order[idx + 1])}>→</Button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
