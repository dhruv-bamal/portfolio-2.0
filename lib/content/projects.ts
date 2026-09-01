import type { Project } from './types';

/**
 * The three backend projects. Every field is drawn from the matching README uploaded this
 * session. None are deployed — the site makes no deployment, live, demo, or public-repository
 * claim for any of them. "Production-grade" is the resume's own wording and is owner-authorized.
 */

const procureflow: Project = {
  slug: 'procureflow',
  name: 'ProcureFlow',
  index: 'I',
  accent: 'ruby',
  mechanism: 'approval-train',
  mechanismName: 'The Approval Train',
  oneLiner: 'Multi-tenant purchase and expense approval API for multi-branch businesses.',
  chamberCopy:
    'A request enters the train and advances through gates set by role and by amount. Some requests are turned back — and the audit ring engraves that decision just as permanently as an approval.',
  problem:
    'Small and mid-sized businesses often manage purchase requests, vendor approvals, and employee expense reimbursements through WhatsApp, spreadsheets, email, and paper forms. This creates delayed decisions, duplicate requests, weak accountability, inconsistent approval rules, and no reliable audit trail.',
  solution:
    'ProcureFlow centralizes purchase and expense workflows for multiple organizations, branches, and departments. It lets employees submit requests, routes them through role- and amount-based approval rules, records every decision in an audit log, and generates asynchronous finance reports.',
  builtFor: [
    'Business owners',
    'Finance and operations administrators',
    'Branch managers',
    'Department managers',
    'Employees and requesters',
    'Vendor coordinators',
  ],
  workflow: [
    { actor: 'Employee', action: 'creates purchase request' },
    { actor: 'Manager', action: 'reviews request' },
    { actor: 'Finance', action: 'verifies budget and vendor details' },
    { actor: 'Owner', action: 'approves high-value requests' },
    { actor: 'System', action: 'records immutable audit events' },
    { actor: 'Request', action: 'becomes approved, rejected, or needs changes' },
  ],
  mechanismSteps: [
    { step: 'Request is created with line items, vendor metadata, and amounts.' },
    {
      step: 'Approval routing selects the next approver by role and amount threshold.',
      note: 'Multi-step approvals based on role and amount thresholds.',
    },
    { step: 'A JWT guard authenticates; an RBAC guard authorizes the actor for this tenant.' },
    {
      step: 'Tenant ownership is checked server-side on every protected query.',
      note: 'Never trusted from client input.',
    },
    { step: 'The decision is applied and the request status history is appended.' },
    {
      step: 'An audit event is written for the action, whatever the outcome.',
      note: 'Actor, organization, action, resource, timestamp, and safe metadata.',
    },
    { step: 'Monthly expense or purchase reports are exported asynchronously by a BullMQ worker.' },
  ],
  decisions: [
    'Passwords are hashed; raw passwords are never stored or logged.',
    'Refresh tokens are stored as hashes and rotated after use.',
    'Tenant ownership is checked server-side, never trusted from client input.',
    'Role checks occur in guards and in service-layer rules.',
    'Request DTOs validate type, length, enum values, and date/amount constraints.',
    'Rate limits protect authentication and public endpoints.',
    'Secrets are supplied through environment variables and excluded from Git.',
    'Audit logs capture actor, organization, action, resource, timestamp, and safe metadata.',
  ],
  proofs: [
    'Duplicate-email registration is rejected.',
    'Invalid DTOs return consistent validation errors.',
    'One organization cannot access another organization’s records.',
    'The Viewer role cannot approve requests.',
    'Approval transition rules are enforced.',
    'Refresh-token reuse is rejected after rotation.',
    'A report job is queued and its status is retrievable.',
  ],
  instrumentation: {
    note:
      'Designed observability, not measured results. Structured request and error logs carry request IDs; no passwords, JWTs, refresh tokens, or authorization headers are logged.',
    names: [
      'GET /health — process-level health check',
      'GET /ready — verifies PostgreSQL and Redis',
      'Structured request/error logs with request IDs',
      'Error tracking for unhandled production exceptions',
    ],
  },
  scopeBoundaries:
    'ProcureFlow intentionally does not implement real accounting, UPI reimbursements, GST calculations, OCR, or ERP integrations. It focuses on the secure backend workflow, authorization, auditability, and operational reliability required before those integrations.',
  futureImprovements: [
    'Approval-policy builder',
    'Attachment storage with malware and file-type validation',
    'Email provider integration',
    'Webhooks for approved and rejected events',
    'SSO/OAuth after local auth is fully stable',
    'Budget limits and spend analytics',
    'Outbox pattern for audit and notification events',
  ],
  stack: [
    { layer: 'Runtime', tech: 'Node.js' },
    { layer: 'Language', tech: 'TypeScript with strict mode' },
    { layer: 'Framework', tech: 'NestJS' },
    { layer: 'API', tech: 'REST + Swagger/OpenAPI' },
    { layer: 'Database', tech: 'PostgreSQL' },
    { layer: 'ORM / migrations', tech: 'Prisma' },
    { layer: 'Authentication', tech: 'JWT, hashed refresh tokens, bcrypt or Argon2' },
    { layer: 'Authorization', tech: 'NestJS guards and role/permission checks' },
    { layer: 'Cache / queue', tech: 'Redis + BullMQ' },
    { layer: 'Testing', tech: 'Jest + Supertest' },
    { layer: 'Containers', tech: 'Docker + Docker Compose' },
    { layer: 'CI', tech: 'GitHub Actions' },
    { layer: 'Observability', tech: 'Structured logs, health/readiness endpoints, error tracking' },
  ],
  phases: [
    { id: 'enter', label: 'Request enters', caption: 'A request is created and enters the approval train.' },
    { id: 'gate', label: 'Gates decide', caption: 'Role and amount thresholds select each approver in turn.' },
    { id: 'engrave', label: 'Audit engraves', caption: 'Approved or rejected, the audit ring records the decision permanently.' },
  ],
  source: 'procureflow-readme',
};

const slotsure: Project = {
  slug: 'slotsure',
  name: 'SlotSure',
  index: 'II',
  accent: 'sapphire',
  mechanism: 'reservation-escapement',
  mechanismName: 'The Reservation Escapement',
  oneLiner:
    'Capacity-aware appointment and reservation API for clinics, service centers, coaching institutes, and multi-branch businesses.',
  chamberCopy:
    'A tooth is caught and held while its expiry dial winds down. It either seats — confirmed — or springs back and restores capacity exactly once. Never twice. That guarantee is the whole mechanism.',
  problem:
    'Businesses with limited appointment slots often manage scheduling through phone calls, WhatsApp, spreadsheets, or manual registers. This leads to double booking, temporary holds that are never released, inconsistent availability, missed appointments, and poor visibility into branch or staff utilization.',
  solution:
    'SlotSure provides a backend for publishing service availability, holding capacity temporarily, confirming reservations, handling cancellations, and automatically releasing expired holds. It is designed to demonstrate transaction-safe booking logic rather than process real medical records or live payments.',
  builtFor: [
    'Branch administrators',
    'Service providers and staff',
    'Receptionists',
    'Customers',
    'Business owners',
  ],
  workflow: [
    { actor: 'Customer', action: 'requests a time slot' },
    { actor: 'API', action: 'validates branch and service availability' },
    { actor: 'Transaction', action: 'locks the capacity record' },
    { actor: 'System', action: 'creates a temporary reservation' },
    { actor: 'Capacity', action: 'is reduced safely' },
    { actor: 'Worker', action: 'schedules a delayed expiry job' },
    { actor: 'Customer', action: 'confirms or cancels the reservation' },
    { actor: 'Expiry', action: 'restores capacity exactly once' },
  ],
  mechanismSteps: [
    { step: 'Validate service, branch, requested slot, and input data.' },
    { step: 'Begin database transaction.' },
    { step: 'Lock the slot-capacity row.', note: 'Row-level locking, or an equivalent concurrency strategy.' },
    { step: 'Verify remaining capacity is greater than zero.' },
    { step: 'Create a reservation with status `held` and an expiry timestamp.' },
    { step: 'Decrement available capacity.' },
    { step: 'Commit transaction.', note: 'Capacity is never updated outside this transaction.' },
    { step: 'Schedule the delayed expiry job.' },
    { step: 'Return the reservation response.' },
  ],
  states: [
    { from: 'held', to: ['confirmed', 'expired', 'cancelled'] },
    { from: 'confirmed', to: ['completed', 'cancelled'] },
    {
      from: 'invalid transitions',
      to: ['rejected'],
      note: 'An expired reservation cannot be confirmed; a cancelled reservation cannot be cancelled again.',
    },
  ],
  decisions: [
    'Capacity is never updated outside the reservation transaction.',
    'A unique idempotency key prevents duplicate reservation or order creation on client retries.',
    'Reservation-expiry workers are idempotent: running the same expiry job twice cannot restore capacity twice.',
    'Database constraints prevent impossible foreign-key relationships.',
    'Indexes support availability, reservation, and user-history queries.',
    'Payment and confirmation webhooks are accepted only once per provider event ID.',
  ],
  proofs: [
    'Two concurrent requests attempt to reserve the final slot — only one reservation succeeds when capacity is one.',
    'Repeating the same idempotency key does not create another reservation.',
    'An expired reservation restores capacity exactly once.',
    'A repeated webhook does not create a duplicate confirmation.',
    'An unauthorized branch user cannot change another branch’s schedule.',
    'Rate-limited requests return an appropriate response.',
  ],
  instrumentation: {
    note:
      'Designed observability, not measured results. These counters and timers are defined by the design; no values are published.',
    names: [
      'reservation_created_total',
      'reservation_confirmed_total',
      'reservation_expired_total',
      'reservation_cancelled_total',
      'booking_failure_total',
      'rate_limited_request_total',
      'background_job_failure_total',
      'reservation_duration_ms',
    ],
  },
  scopeBoundaries:
    'SlotSure is a scheduling and reservation backend demonstration. It does not store real medical records, process live payments, issue prescriptions, or make healthcare decisions. It uses mock services, mock customer records, and a payment-confirmation simulator.',
  futureImprovements: [
    'Calendar sync',
    'SMS/WhatsApp/email provider integration',
    'Dynamic capacity rules',
    'Waitlist promotion worker',
    'Payment gateway sandbox integration',
    'Multi-resource bookings',
    'Time-zone-aware scheduling',
  ],
  stack: [
    { layer: 'Runtime / language', tech: 'Node.js + TypeScript' },
    { layer: 'Framework', tech: 'NestJS' },
    { layer: 'API', tech: 'REST + Swagger/OpenAPI' },
    { layer: 'Database', tech: 'PostgreSQL' },
    { layer: 'Database layer', tech: 'Prisma, plus raw SQL where transaction/lock semantics require it' },
    { layer: 'Cache / rate limit', tech: 'Redis' },
    { layer: 'Background jobs', tech: 'BullMQ' },
    { layer: 'Testing', tech: 'Jest + Supertest' },
    { layer: 'Load testing', tech: 'k6 or Artillery' },
    { layer: 'Containers', tech: 'Docker + Docker Compose' },
    { layer: 'CI', tech: 'GitHub Actions' },
    { layer: 'Observability', tech: 'Structured logs, health checks, error tracking' },
  ],
  phases: [
    { id: 'hold', label: 'Held', caption: 'The capacity row is locked and a reservation is held with an expiry.' },
    { id: 'race', label: 'One wins', caption: 'Two concurrent requests race for the final slot; exactly one succeeds.' },
    { id: 'release', label: 'Released once', caption: 'On expiry, capacity is restored exactly once — a repeated job changes nothing.' },
  ],
  source: 'slotsure-readme',
};

const dealersync: Project = {
  slug: 'dealersync',
  name: 'DealerSync',
  index: 'III',
  accent: 'citrine',
  mechanism: 'sorting-barrel',
  mechanismName: 'The Sorting Barrel',
  oneLiner:
    'Asynchronous distributor order-import and exception-management API for merchants, wholesalers, and operations teams.',
  chamberCopy:
    'Rows feed through a validation comb. Good rows seat into the order wheel; bad rows drop into labelled trays with a reason attached. Run the barrel again and nothing seats twice.',
  problem:
    'Distributors and merchants often receive order files from sales teams, marketplaces, retailers, and accounting systems in inconsistent CSV/Excel formats. Manual imports are slow and error-prone: files may contain unknown headers, invalid SKUs, duplicate external order IDs, invalid quantities, or missing customer information. Processing large files synchronously also causes request timeouts and poor user experience.',
  solution:
    'DealerSync accepts order CSV uploads, creates an import batch, processes data asynchronously in a worker, validates and deduplicates rows, stores valid orders, records invalid rows with useful reasons, and exposes progress, metrics, and downloadable error reports.',
  builtFor: [
    'Distributor owners',
    'Operations managers',
    'Data-entry teams',
    'Merchant administrators',
    'Warehouse coordinators',
    'Finance and admin teams',
  ],
  workflow: [
    { actor: 'Operations user', action: 'uploads CSV' },
    { actor: 'API', action: 'validates metadata and headers' },
    { actor: 'Import batch', action: 'is saved as queued' },
    { actor: 'BullMQ', action: 'job is created' },
    { actor: 'Worker', action: 'parses rows in batches' },
    { actor: 'Worker', action: 'validates SKU, customer, quantity, and order data' },
    { actor: 'Valid records', action: 'are inserted' },
    { actor: 'Invalid and duplicate rows', action: 'are recorded with reasons' },
    { actor: 'Progress', action: 'is updated' },
    { actor: 'User', action: 'retrieves status and downloads the error report' },
  ],
  mechanismSteps: [
    { step: 'The upload request returns quickly; it does not parse a large file inline.' },
    { step: 'Rows are processed in bounded batches to control memory use.' },
    {
      step: 'Each row is validated independently.',
      note: 'SKU must exist; quantity must be a positive integer; customer identifier must be present; order date must be valid; external order ID cannot duplicate an existing order for the merchant.',
    },
    {
      step: 'Valid orders are imported even if some rows fail.',
      note: 'Partial success — bad rows never discard valid rows.',
    },
    { step: 'A deterministic key or unique database constraint prevents duplicate external orders.' },
    { step: 'Workers are idempotent: retries cannot create duplicate records.' },
    { step: 'Import state changes are persisted so progress survives a worker restart.' },
    { step: 'Failed rows are compiled into a downloadable error-report CSV.' },
  ],
  states: [
    { from: 'queued', to: ['processing'] },
    { from: 'processing', to: ['completed', 'partially_completed', 'failed', 'cancelled'] },
  ],
  decisions: [
    'The upload request returns quickly; it does not parse a large file inline.',
    'Rows are processed in bounded batches to control memory use.',
    'Each row is validated independently so valid orders can be imported even if some rows fail.',
    'A deterministic key or unique database constraint prevents duplicate external orders.',
    'Workers are idempotent: retries cannot create duplicate records.',
    'Import state changes are persisted so a user can inspect progress after a worker restart.',
  ],
  proofs: [
    'An invalid file type is rejected.',
    'A missing required CSV header is caught.',
    'Valid rows are imported.',
    'Invalid rows are recorded with actionable messages.',
    'A duplicate external order does not create another order.',
    'A worker retry does not duplicate valid rows.',
    'A large import reports progress.',
    'One merchant cannot access another merchant’s import.',
    'The error report contains the expected failed rows.',
  ],
  instrumentation: {
    note:
      'Designed observability, not measured results. These counters and timers are defined by the design; no values are published.',
    names: [
      'imports_created_total',
      'imports_completed_total',
      'imports_failed_total',
      'import_rows_processed_total',
      'import_rows_rejected_total',
      'import_duplicate_rows_total',
      'import_job_duration_ms',
      'import_retry_total',
      'queue_depth',
      'worker_failure_total',
    ],
  },
  scopeBoundaries:
    'DealerSync supports CSV order ingestion and operational exception handling. It does not attempt to replace a full ERP, accounting platform, warehouse management system, marketplace integration suite, or data warehouse.',
  futureImprovements: [
    'Column-mapping templates per merchant',
    'XLSX support',
    'Object storage for original files',
    'Webhook callback on import completion',
    'Scheduled imports from SFTP',
    'Fraud and rules pipeline',
    'Kafka event stream for independent analytics consumers',
    'Warehouse and inventory integration',
  ],
  stack: [
    { layer: 'Runtime / language', tech: 'Node.js + TypeScript' },
    { layer: 'Framework', tech: 'NestJS' },
    { layer: 'API', tech: 'REST + Swagger/OpenAPI' },
    { layer: 'Database', tech: 'PostgreSQL' },
    { layer: 'Database layer', tech: 'Prisma or SQL query layer' },
    { layer: 'Queue', tech: 'Redis + BullMQ' },
    { layer: 'File handling', tech: 'Streaming/batched CSV parser' },
    { layer: 'Testing', tech: 'Jest + Supertest' },
    { layer: 'Containers', tech: 'Docker + Docker Compose' },
    { layer: 'CI', tech: 'GitHub Actions' },
    { layer: 'Observability', tech: 'Structured logs, job metrics, health checks, error tracking' },
  ],
  phases: [
    { id: 'feed', label: 'Rows feed', caption: 'The upload returns immediately and a worker parses rows in bounded batches.' },
    { id: 'sort', label: 'Comb sorts', caption: 'Valid rows seat; invalid rows drop into labelled trays with a reason.' },
    { id: 'retry', label: 'Retry seats nothing twice', caption: 'A retry re-runs the batch without duplicating rows that already seated.' },
  ],
  source: 'dealersync-readme',
};

export const projects: Project[] = [procureflow, slotsure, dealersync];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectNeighbours(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
}

/**
 * Source note shown on every case study.
 * TODO (T3): reserved slot — replace `href` with the public repository URL per project
 * once the owner makes each repository public.
 */
export const sourceNote = {
  note: 'Repository private — source available on request.',
  href: 'https://github.com/dhruv-bamal',
  hrefLabel: 'github.com/dhruv-bamal',
  reservedPublicUrl: null as string | null,
  source: 'owner-session-answer' as const,
};
