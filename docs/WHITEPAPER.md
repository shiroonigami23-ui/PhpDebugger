---
title: "PHP Debugger Forensics: Making Silent Backend Failures Visible from the Browser"
subtitle: "Technical Whitepaper — v0.1"
author: "Aryan Singh Chandel (shiroonigami23-ui)"
date: "November 2026"
---

# Abstract

Many PHP/SQL web applications fail *quietly*. A request returns `500` with an empty body, a database connection times out behind a generic error page, or an auth failure is swallowed by the front end. The person who sees the bug, often a tester or end user, cannot describe it. The developer who could fix it cannot reproduce it. **PHP Debugger Forensics** is a Chrome (Manifest V3) extension that closes this gap **without any change to the backend**. A **DevTools panel** gives developers network forensics and failure classification. A **tester popup** gives anyone a *Record → Reproduce → Export* flow that produces a sanitised incident bundle. This paper describes the problem, the architecture, the classification model, the privacy design and the roadmap. A live demo site is published from the same codebase.

# 1. Problem statement

| Symptom the user sees | What actually happened | Why it's hard to debug |
|---|---|---|
| "The button does nothing" | `POST /api/...` → `500`, empty body | No error shown, and the console is ignored |
| "The page is slow, then breaks" | PDO connection timeout | Intermittent; gone by the time a dev looks |
| "I got logged out" | `401`/`419` from an expired session or CSRF token | Depends on the user's own session |
| "Some data is missing" | SQL error caught and turned into `[]` | Only visible in server logs, if logging exists |

The common thread is that **the evidence lives in the browser's network traffic at the moment of failure**, and that evidence is lost as soon as the tab closes.

# 2. Design goals

1. **Zero backend changes.** Work on any site, including legacy PHP that cannot easily be instrumented.
2. **Two audiences.** A deep view for developers, and a two-button flow for non-technical testers.
3. **Safe by default.** Exported bundles must be shareable in a ticket, which means secrets and PII are stripped.
4. **Actionable output.** Classify failures and link them to server logs with correlation IDs instead of dumping raw HAR files.

# 3. Architecture

```
            ┌──────────────── Chrome (MV3) ────────────────┐
 page  ───► │ network activity                              │
            │      │                                        │
            │      ▼                                        │
            │ background service worker (background.ts)     │
            │   • capture session store                      │
            │   • start / stop / get / clear actions         │
            │   • message bus (chrome.runtime.onMessage)     │
            │      ▲                     ▲                   │
            │      │ messages            │ messages          │
            │ DevTools panel        Tester popup             │
            │ (Nuxt 3 + Tailwind)   (Nuxt 3 + Tailwind)      │
            └───────────────────────────────────────────────┘
                                  │ export
                                  ▼
                     sanitised incident bundle (.json)
```

| Layer | Technology |
|---|---|
| Extension platform | Chrome Manifest V3: service worker, `devtools_page`, `action` popup, declarative rules |
| UI | Nuxt 3 (SPA, `ssr: false`), Vue 3, Tailwind CSS, TypeScript (strict) |
| State | In-memory capture session in the service worker (`CaptureEvent[]`) |
| Build | `nuxi generate` → static assets → `dist/` for the extension; the same build is deployed as the public demo site |

## 3.1 Data model

```ts
interface CaptureEvent {
  type: 'request' | 'response' | 'error'
  timestamp: number
  url: string
  method: string
  status?: number
  headers?: Record<string, string>
  correlationId?: string
}
```

Each event is small and flat on purpose. A bundle is just an ordered list of events plus environment metadata (page URL, user agent, timestamps), so it is easy to diff, replay and attach to a ticket.

# 4. Failure classification

The classification model below is what the DevTools panel is designed around (shown in v0.1 with sample data; see §7). It groups failures into patterns a PHP developer recognises at once:

| Class | Signals |
|---|---|
| **Unhandled exception** | `5xx` with an empty or generic body; PHP fatal-error signatures in the body |
| **Database failure** | Body or headers mention PDO/MySQL/`SQLSTATE`, or connection timeouts on data endpoints |
| **Auth / session** | `401`, `403`, `419` (CSRF), or redirects to the login page mid-flow |
| **Rate limiting** | `429` plus `Retry-After` |
| **Timeout / slow** | TTFB above threshold, or requests that never complete |

Each finding shows its **correlation ID**, read from headers such as `X-Request-ID` or `X-Correlation-ID`. The developer can then `grep` the server log for the exact failing request instead of guessing by timestamp.

# 5. Privacy and safety

Exported bundles are meant to be pasted into public issue trackers, so the export step is specified to sanitise them. These rules are part of the design and ship with the live-capture milestone:

- the values of `Authorization`, `Cookie`, `Set-Cookie`, API-key and CSRF headers are redacted;
- passwords and tokens in form or JSON bodies are masked;
- only metadata and failure-relevant response snippets are kept, never full page contents.

Capture runs only while the user has explicitly pressed **Start**, and the session lives in memory until it is exported or cleared.

# 6. Live demo and distribution

The same Nuxt codebase builds two targets:

1. **Extension assets**: popup and DevTools pages loaded through *Load unpacked*.
2. **Public showcase site** on Vercel: a landing page that embeds the real popup and DevTools screens with sample data. Visitors can try the Record → Export flow without installing anything.

Getting the site to deploy uncovered two build issues, both now fixed. First, an ESLint peer-dependency conflict broke `npm install`; migrating to `@nuxt/eslint` resolved it. Second, the Vercel Nitro preset redirected the build output away from the configured directory; it is now pinned with `NITRO_PRESET=static`.

# 7. Current status and limitations

- **v0.1 is a working UI and architecture scaffold.** The service-worker message bus and both UIs exist. Wiring live `chrome.devtools.network` and `webRequest` events into the session store is the next milestone, and the demo currently runs on representative sample data.
- Chromium only. A Firefox port would need the `browser.*` namespace and MV3 differences handled.
- Response-body inspection from DevTools works only while DevTools is open, which is a platform constraint.
- Classification is rule-based. Unusual frameworks may need extra signatures.

# 8. Roadmap

1. Live capture through `chrome.devtools.network.onRequestFinished` in the panel, and `webRequest` in the worker for the popup flow.
2. Persist sessions to `chrome.storage.session` so they survive service-worker restarts.
3. Export formats: sanitised JSON, HAR subset and a Markdown bug report template.
4. Pluggable signature packs for Laravel, Symfony, WordPress and CodeIgniter.
5. Optional backend helper (a PHP middleware) that adds correlation IDs, for teams who *can* change the server.
6. Publish to the Chrome Web Store.

# 9. Conclusion

PHP Debugger Forensics treats the browser as a forensic sensor. It captures failure evidence where it happens and classifies it in terms developers already use. It produces bundles that are safe to share and can be tied back to server logs. The dual-mode design serves both people in the bug-report loop, and the zero-backend-change approach makes it usable on legacy systems where debugging is hardest.

# References

1. Chrome for Developers. *Manifest V3 overview; chrome.devtools.network; declarativeNetRequest.* https://developer.chrome.com/docs/extensions
2. Nuxt. *Nuxt 3 documentation: static generation and Nitro presets.* https://nuxt.com/docs
3. W3C. *HTTP Archive (HAR) format* (draft).
4. OWASP. *Logging Cheat Sheet*, on correlation IDs and sensitive-data exclusion. https://cheatsheetseries.owasp.org/
