"use client";

import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { initialIssues, projects } from "@/lib/mock-data";
import { Issue, IssueFilters, IssueStatus, Project } from "@/lib/types";

interface IssueInput {
  title: string;
  description: string;
  status: IssueStatus;
  priority: Issue["priority"];
  assignee: string;
  labels: string[];
  dueDate?: string;
  projectId: string;
}

interface IssueStore {
  issues: Issue[];
  projects: Project[];
  loading: boolean;
  error?: string;
  search: string;
  filters: IssueFilters;
  setSearch: (value: string) => void;
  setFilters: (value: IssueFilters) => void;
  createIssue: (input: IssueInput) => void;
  updateIssue: (id: string, input: Partial<IssueInput>) => void;
  deleteIssue: (id: string) => void;
  getIssueById: (id: string) => Issue | undefined;
  filteredIssues: Issue[];
}

const Ctx = createContext<IssueStore | null>(null);

export function IssueStoreProvider({ children }: { children: ReactNode }) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<IssueFilters>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setIssues(initialIssues);
      } catch {
        setError("Failed to load issues.");
      } finally {
        setLoading(false);
      }
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const query = search.toLowerCase();
      const matchesSearch =
        issue.title.toLowerCase().includes(query) ||
        issue.id.toLowerCase().includes(query) ||
        issue.description.toLowerCase().includes(query);
      const matchesStatus = !filters.status || issue.status === filters.status;
      const matchesPriority = !filters.priority || issue.priority === filters.priority;
      const matchesAssignee = !filters.assignee || issue.assignee === filters.assignee;
      return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
    });
  }, [issues, search, filters]);

  const createIssue = (input: IssueInput) => {
    const id = `ISS-${Math.floor(Math.random() * 900 + 100)}`;
    const now = new Date().toISOString().slice(0, 10);
    setIssues((prev) => [{ ...input, id, comments: [], activity: [{ id: crypto.randomUUID(), text: "Created issue", createdAt: now }] }, ...prev]);
  };

  const updateIssue = (id: string, input: Partial<IssueInput>) => {
    const now = new Date().toISOString().slice(0, 10);
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === id
          ? {
              ...issue,
              ...input,
              activity: [{ id: crypto.randomUUID(), text: "Updated issue", createdAt: now }, ...issue.activity]
            }
          : issue
      )
    );
  };

  const deleteIssue = (id: string) => setIssues((prev) => prev.filter((issue) => issue.id !== id));

  const value: IssueStore = {
    issues,
    projects,
    loading,
    error,
    search,
    filters,
    setSearch,
    setFilters,
    createIssue,
    updateIssue,
    deleteIssue,
    getIssueById: (id) => issues.find((issue) => issue.id === id),
    filteredIssues
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useIssueStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useIssueStore must be used in IssueStoreProvider");
  return ctx;
}
