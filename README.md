# Linear-style Task Manager (Next.js)

Ứng dụng quản lý công việc production-ready theo phong cách Linear, dùng làm nền tảng để nối API thật.

## Stack
- Next.js 14 (App Router) + TypeScript (strict)
- Tailwind CSS
- UI primitives theo style shadcn/ui (components tách riêng trong `components/ui`)
- `next-themes` cho dark mode

## Features
- Issues List: status, priority, assignee, labels, due date.
- Board View: 4 cột To Do / In Progress / Review / Done.
- Issue Detail: title, description, comments, activity log.
- Projects: danh sách project và progress.
- CRUD issue (create/edit/delete).
- Filter theo status/priority/assignee + realtime search.
- Keyboard-friendly: nhấn `/` để focus ô search.
- Loading / Empty / Error states.
- Mock data rõ ràng ở `lib/mock-data.ts`, dễ thay bằng API/service.

## Architecture
- `lib/types.ts`: domain types.
- `lib/mock-data.ts`: mock project + issue data.
- `lib/issue-store.tsx`: store/context quản lý state + filter + CRUD.
- `components/layout/AppShell`: shell layout, nav, theme toggle.
- `components/issues/*`: IssueCard, IssueTable, BoardColumn, Filters, IssueForm.

## Run
```bash
npm install
npm run dev
```

## Quality checks
```bash
npm run typecheck
npm run lint
npm run build
```

## Notes để nối API thật
1. Thay `lib/issue-store.tsx` bằng React Query/SWR + API client.
2. Giữ nguyên contract type trong `lib/types.ts` để tránh ảnh hưởng UI.
3. Tách mutation thành service layer (`/lib/services`) để dễ test.
