Purpose
- Brief summary: Document major features, acceptance criteria, data models, and deployment (including Docker) for DonorConnect.

Scope
- Covers web app (Next.js), API routes, database (Prisma + PostgreSQL), CI/deploy, and developer/runtime Docker usage.

Audience
- Developers, QA, Product, DevOps.

Features
- Donor Management: View / add / edit / delete donors. Status: Implemented. Acceptance: Can create donor and see it in list with correct organization filtering.
- Donation Recording: Record donations linked to donors. Status: Implemented. Acceptance: New donation updates donor totals and lastGiftDate.
- Dashboard / Summaries: Totals, charts, retention metrics. Status: Implemented. Acceptance: Dashboard shows Total Donors, Total Donations, retention chart.
- Authentication & Roles: Email/password, session cookies, org-scoped access. Status: Implemented. Acceptance: Protected routes block unauthorized requests.
- AI Insights: Donation risk scoring + suggested messages. Status: Implemented. Acceptance: AI endpoint returns recommendations and risk score.
- Campaigns & Segments: Create/manage campaigns, donor segmentation. Status: Implemented. Acceptance: Segments filter donors using saved criteria.
- Workflows & Tasks: Automated workflows + manual tasks. Status: In progress. Acceptance: Basic workflow runner executes actions for a segment.
- Import/Export CSV: Bulk donor import and export. Status: Planned. Acceptance: CSV import maps fields and reports errors.

User Stories / Flows (examples)
- As a Fundraiser, I can record a donation so donor totals update.
- As an Admin, I can approve a high-risk donor so they receive special outreach.
- As a Manager, I can view the dashboard to assess retention KPIs.

Data & Models (key fields)
- Organization: id, name
- User: id, email, role, organizationId
- Donor: id, name, email, totalAmount, totalGifts, lastGiftDate, retentionRisk
- Donation: id, donorId, amount, date, type, campaignId
- Campaign: id, name, organizationId

Acceptance Criteria / Testing
- Each feature must list manual test steps and at least one unit/integration test in Vitest or Playwright where appropriate.
- Example: Donor create: POST /api/donors -> 201 and GET /api/donors contains new donor.

Docker & Deployment (required notes)
- Image build:
  - Dockerfile uses `node:20-bullseye-slim`.
  - Build steps: copy lockfile, `npm install`, copy app, `npm run build`.
- Runtime startup:
  - `CMD` runs `npx prisma generate && npm run start` so Prisma client is generated using runtime env.
- Environment files:
  - `.env.production` contains `DATABASE_URL` (production DB). Compose file references `.env.production`.
- Ports & health:
  - Container exposes `3000`.
  - DB service (Postgres) runs on standard 5432; compose maps persisted volume.
- Volumes & data:
  - DB data persisted with a Docker volume (e.g., `db_data`).
- Developer notes:
  - Use `.dockerignore` to exclude `node_modules`, `.next`, `.git`.
  - If native binaries fail, prefer Debian-based Node images over Alpine or add build deps.
- CI/CD:
  - Build pipeline should run `npm ci`, `npx prisma generate` (or generate at startup), `npm run build`, and deploy image to Vercel/Registry.

Security & RBAC
- Admin vs Staff capabilities documented; orgId enforced on DB queries.
- Sessions via HTTP-only cookies; API routes validate session token from request.

Integrations
- Neon/Postgres (DATABASE_URL), Prisma (generated client), AI provider (API key in env), SendGrid/email (optional), Vercel for hosting.

Known Limitations / Non-goals
- No external OAuth providers. Some advanced analytics marked out-of-scope for MVP.

Roadmap / Next Milestones
- CSV import UX + validation
- Role-based admin console pages
- Enhanced AI recommendations and safe-guarding

Links
- README: [README.md](README.md)
- Dockerfile: [Dockerfile](Dockerfile)
- Compose: [docker-compose.yml](docker-compose.yml)
- Prisma schema: [prisma/schema.prisma](prisma/schema.prisma)

Changelog
- v0.1 — Initial feature set and Docker support.
