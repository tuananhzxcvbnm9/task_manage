import Link from "next/link";
import { Issue } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function IssueTable({ issues, onDelete }: { issues: Issue[]; onDelete: (id: string) => void }) {
  if (issues.length === 0) {
    return <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">No issues found.</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full text-sm">
        <thead className="bg-muted text-left text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-3 py-2">Issue</th><th className="px-3 py-2">Status</th><th className="px-3 py-2">Priority</th><th className="px-3 py-2">Assignee</th><th className="px-3 py-2">Due</th><th className="px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.id} className="border-t">
              <td className="px-3 py-2"><Link href={`/issues/${issue.id}`} className="font-medium hover:underline">{issue.title}</Link><div className="text-xs text-muted-foreground">{issue.id}</div></td>
              <td className="px-3 py-2"><Badge>{issue.status}</Badge></td>
              <td className="px-3 py-2"><Badge>{issue.priority}</Badge></td>
              <td className="px-3 py-2">{issue.assignee}</td>
              <td className="px-3 py-2">{issue.dueDate ?? "-"}</td>
              <td className="px-3 py-2"><Button onClick={() => onDelete(issue.id)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
