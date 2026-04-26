"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Issue } from "@/lib/types";

const defaultValue = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  assignee: "",
  labels: "",
  dueDate: "",
  projectId: "p1"
};

export function IssueForm({ initial, onSubmit, triggerLabel }: { initial?: Issue; onSubmit: (data: { title: string; description: string; status: Issue["status"]; priority: Issue["priority"]; assignee: string; labels: string[]; dueDate?: string; projectId: string }) => void; triggerLabel: string }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(() =>
    initial
      ? { ...initial, labels: initial.labels.join(",") }
      : defaultValue
  );

  const submit = () => {
    onSubmit({
      title: form.title,
      description: form.description,
      status: form.status,
      priority: form.priority,
      assignee: form.assignee,
      labels: form.labels.split(",").map((s) => s.trim()).filter(Boolean),
      dueDate: form.dueDate || undefined,
      projectId: form.projectId
    });
    setOpen(false);
    setForm(defaultValue);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>{triggerLabel}</Button>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-lg border bg-card p-4">
            <h2 className="mb-3 text-lg font-semibold">{initial ? "Edit issue" : "Create issue"}</h2>
            <div className="grid gap-2">
              <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <textarea className="min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <div className="grid gap-2 md:grid-cols-2">
                <select className="h-9 rounded-md border px-3 text-sm" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Issue["status"] })}><option value="todo">To Do</option><option value="in_progress">In Progress</option><option value="review">Review</option><option value="done">Done</option></select>
                <select className="h-9 rounded-md border px-3 text-sm" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as Issue["priority"] })}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option></select>
                <Input placeholder="Assignee" value={form.assignee} onChange={(e) => setForm({ ...form, assignee: e.target.value })} />
                <Input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
                <Input className="md:col-span-2" placeholder="labels: ui,backend" value={form.labels} onChange={(e) => setForm({ ...form, labels: e.target.value })} />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="border-primary text-primary" onClick={submit} disabled={!form.title || !form.assignee}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
