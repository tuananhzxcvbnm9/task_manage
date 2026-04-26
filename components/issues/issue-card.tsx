import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Issue } from "@/lib/types";

export function IssueCard({ issue }: { issue: Issue }) {
  return (
    <Card className="p-3">
      <Link href={`/issues/${issue.id}`} className="block space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">{issue.title}</p>
          <Badge>{issue.priority}</Badge>
        </div>
        <p className="text-xs text-muted-foreground">{issue.id} · {issue.assignee}</p>
        <div className="flex flex-wrap gap-1">
          {issue.labels.map((label) => <Badge key={label}>#{label}</Badge>)}
        </div>
      </Link>
    </Card>
  );
}
