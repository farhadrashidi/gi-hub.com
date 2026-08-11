# Marketplace architecture

## Current deployment

GI-Hub remains a static GitHub Pages site. The marketplace directory is intentionally public, contains indicative capabilities only, and performs no data storage in the browser. The RFQ form validates basic input locally and hands the request to the visitor's email application. It must not be treated as an authenticated submission endpoint.

## Production service boundary

When live marketplace operations are approved, deploy the API separately from this static site. Version endpoints under `/v1`, use JSON only, and keep PostgreSQL unreachable from the public internet.

| Resource | REST endpoints | PostgreSQL ownership |
| --- | --- | --- |
| Organisations | `POST /v1/organisations`, `GET/PATCH /v1/organisations/{id}` | organisation, verification records |
| Listings | `GET /v1/listings`, `POST /v1/listings`, `GET/PATCH /v1/listings/{id}` | listings, listing_markets, certifications |
| RFQs | `POST /v1/rfqs`, `GET /v1/rfqs/{id}` | rfqs, rfq_items, audit_events |
| Introductions | `POST /v1/introductions`, `PATCH /v1/introductions/{id}` | introductions, consent records |

Use UUID primary keys, `created_at`/`updated_at` timestamps, foreign keys, check constraints for lifecycle states, and database migrations. Restrict tenant-scoped queries to the authenticated organisation, paginate public reads with cursor pagination, and keep audit events append-only.

## Security baseline

- Enforce TLS, HSTS, a restrictive CSP, rate limits, request-size limits, and structured security logs at the API edge.
- Use an identity provider with MFA for staff, short-lived access tokens, rotating refresh tokens, and server-side authorization on every request. Never trust organisation or role identifiers from the client.
- Validate and normalize all server input with allow-lists; parameterize every SQL query; encode output by context; scan uploads and store them outside the web root.
- Require manual business verification before publishing supplier capabilities or allowing introductions. Do not collect banking credentials or sensitive identity documents through general RFQs.
- Apply least-privilege database roles, encrypted backups, secret management, retention limits, incident monitoring, and regular dependency/security reviews.

## Migration path

Replace only the directory data adapter and RFQ submit handler when the API exists. Keep the static UI as a separate client. This preserves the current GitHub Pages site while giving the API and PostgreSQL service independent deploy, scale, and security boundaries.
