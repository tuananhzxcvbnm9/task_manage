"use client";

import { useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Filters } from "@/components/issues/filters";
import { IssueTable } from "@/components/issues/issue-table";
import { IssueForm } from "@/components/issues/issue-form";
import { useIssueStore } from "@/lib/issue-store";

export default function IssuesPage() {
  const { loading, error, filteredIssues, filters, setFilters, search, setSearch, createIssue, deleteIssue, issues } = useIssueStore();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault();
        document.getElementById("search-input")?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <AppShell>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Issues List</h2>
          <IssueForm triggerLabel="New Issue (N)" onSubmit={createIssue} />
        </div>
        <Filters value={filters} search={search} onChange={setFilters} onSearch={setSearch} assignees={[...new Set(issues.map((i) => i.assignee))]} />
        {loading && <div className="rounded-lg border p-8 text-sm text-muted-foreground">Loading issues...</div>}
        {error && <div className="rounded-lg border border-red-500 p-8 text-sm text-red-500">{error}</div>}
        {!loading && !error && <IssueTable issues={filteredIssues} onDelete={deleteIssue} />}
      </div>
    </AppShell>
  );
}
