# Jefrine Correya — Senior Engineering & UI/UX Portfolio Audit Report

This document presents a comprehensive, full-stack senior engineering and UI/UX team audit of the **Jefrine Correya Cybersecurity Portfolio**, evaluating every viewport breakpoint (`320px` to `1700px+`), every typographic scale and copy block, all interactive UI flows, and the underlying data/service architecture.

## User Review & Critical Decisions

> [!IMPORTANT]
> Per your selection, **no source code has been modified in this pass** (`Deliver the audit report only without code changes`). All findings below are documented so you have full visibility into what is working well, what has subtle edge cases on mobile or backend tests, and what optional enhancements can be applied whenever you choose.

- **Confirmed Decision 1 — Audit Report Only (Zero Code Changes)**: Preserve the current working build (`54%` default Résumé zoom, automatic 3D Live Hero Showcase, external station bar with 4-second focus hold, and removed `AUTO TOUR` button) while delivering a complete technical and visual audit.
- **Optional Next-Step Enhancements (Ready On Request)**:
  1. **Mobile External Station Bar Labels**: Keep project names (`ASTRA`, `SOC AI`, etc.) visible alongside numbers (`01`, `02`) on mobile (`<= 600px`) and tablet (`901px–1150px`) screens using horizontal touch scrolling.
  2. **Mobile Micro-Typography Floor**: Raise the `4px–6px` mobile monospace labels and simulator log lines to a `9px–10px` minimum legibility floor.
  3. **Mobile Document Room Width**: Use full-width (`100%`) paper scaling on mobile viewports (`<= 760px`) while keeping the `54%` default zoom on desktop screens.
  4. **E2E Test Suite Alignment**: Sync the automated Playwright hero test suite with the new 3D-Live-only showcase behavior.

---

## 1. Overview & Core Concept

- **What It Does**: Serves as an authentic, evidence-backed portfolio for Jefrine Correya (EC-Council Certified SOC Analyst based in Doha, Qatar), combining a real-time Three.js 3D WebGL project showcase, 19 verified security case studies, an interactive browser-local SOC triage simulator, a 26-repository open-source index, and a preview-first Document Room for original PDFs.
- **Target Audience / Persona**: SOC Hiring Managers, Security Operations Team Leads, CISO/Engineering Recruiters in Doha/Dubai, and cybersecurity peers evaluating real technical depth.
- **Key Value**: Bridges high-craft editorial dark-mode design with verifiable engineering proof—every claim, certificate, and lab interface is backed by cryptographic SHA-256 hashes, source repositories, and honest scope disclosures.

---

## 2. User Experience, Mobile & Typography Audit

### A. What Is Working Exceptionally Well (UI & Frontend Strengths)

1. **Split-Screen Hero & 3D Live Spatial Showcase**
   - **Automatic WebGL Launch**: Opens immediately into the 8-station Three.js orbital gallery (`01 ASTRA` through `08 PCAP`) without requiring a manual play click or displaying redundant mode-switch pills.
   - **Dynamic In-Window Motion & 3D Parallax**: Each floating glass display renders a live `1600×1000` composited canvas texture with real interface motion, scanning sweeps, telemetry counters, and 3D parallax detail cards.
   - **External Station Bar & 4-Second Focus Hold**: Sitting cleanly outside and below the 16:9 viewport frame, clicking any project pill smoothly flies the camera to that station, holds focus for exactly **4 seconds** so the visitor can inspect the window, and then automatically resumes the continuous orbital tour.
2. **The Document Room (`JC–01` Modal)**
   - **Preview-First Ethics**: Never auto-downloads files; users preview high-resolution WebP page renders or switch to the `Readable text` transcript before choosing `Download PDF`.
   - **Desktop Résumé Legibility**: Opening the Résumé now defaults to **54% zoom**, making headings, bullet points, and dates immediately readable while keeping the full page framed comfortably in the viewport.
   - **Keyboard & Screen-Reader Rigor**: Traps focus inside the dialog, marks the background app `inert`, supports `ESC` to close, and restores focus to the triggering button.
3. **Interactive Local SOC Session (Analyst Simulator)**
   - **Three Realistic Triage Scenarios**: *Repeated SSH Authentication Failures*, *Suspicious URL Submission*, and *Outbound C2 Beacon* allow recruiters to step through `01 Raw logs` → `02 Context` → `03 Verdict` with a clear 4-stage pipeline indicator (`INGEST`, `PARSE`, `ENRICH`, `TRIAGE`).
4. **Command Palette (`⌘K` / `Ctrl+K`) & Navigation**
   - Instant keyboard-first search across all 5 primary routes and all 19 project case studies with arrow-key selection and `ESC` dismissal.

### B. Detailed Mobile & Viewport Audit (`320px` → `1700px+`)

| Viewport Tier | Breakpoint Range | Layout & Overflow Status | Key Findings & Edge Cases |
| :--- | :--- | :--- | :--- |
| **Ultra-Wide Desktop** | `>= 1700px` | Pass (Zero overflow) | Hero split (`45.6% / 54.4%`) and `1392px` container scale cleanly; `h1` locks at `134px`. |
| **Standard Desktop** | `1151px – 1699px` | Pass (Zero overflow) | Balanced two-column Hero, 2-column Featured Dossier, 3-column Archive Grid, and sticky Case Study sidebar. |
| **Compact Laptop / Tablet Landscape** | `901px – 1150px` | Pass (Minor UX note) | In the external station bar below the 3D showcase, `.pill-name` is hidden via CSS (`display: none`), leaving only `01`, `02`...`08` pills even though horizontal scrolling is available. |
| **Tablet Portrait** | `601px – 900px` | Pass (Minor text size note) | Hero stacks into a single column with the 3D showcase full-width (`max-width: 800px`) below the hero copy. Desktop nav switches cleanly to the accessible mobile dialog menu at `<= 800px`. |
| **Mobile Phone** | `361px – 600px` | Pass (2 UX areas to note) | 1. External station bar hides project names (`.pill-name { display: none }`), showing only numbers.<br>2. Opening the Résumé at `54%` zoom sets `.document-paper` to `width: 54%` of the mobile viewport (`~190px` wide on a `375px` phone), requiring the user to tap `+` or `54%` (Fit to width) to read on small phones. |
| **Ultra-Narrow Phone** | `320px – 360px` | Pass (Zero horizontal scroll) | Container maintains `16px` outer gutters (`width: calc(100% - 32px)`), `h1` clamps to `64px–74px`, and all cards stack in a single column without horizontal overflow. |

### C. Every Piece of Text & Typography Audit

- **Font Stack & Self-Hosting**: All 10 font weights (`Space Grotesk` 400–700, `Inter` 400–700, `IBM Plex Mono` 400–500) are self-hosted `.woff2` files in `/fonts/` with `font-display: swap` and verified OFL licenses—zero external Google Fonts network latency or privacy leakage.
- **Copy Accuracy & Tone**:
  - **Identity & Location**: Consistently states `Jefrine Correya`, `Doha, Qatar`, `AST / UTC +03:00`, and `1+ Years in Cybersecurity` across Overview, Journey, Credentials, Contact, and Footer.
  - **Experience & Timeline**: Accurately reflects `Wahy Lab Solutions (SEP 2025 — MAY 2026)` and `RedTeam Hacker Academy (FEB 2025 — JUL 2025)` with zero outdated or conflicting entries.
  - **Earned vs. Pursuing Credentials**: Clearly distinguishes earned qualifications (`EC-Council CSA` issued `27 July 2025` and `CICSA v3` issued `11 July 2025`) from the pursuing study track (`CompTIA Security+ SY0-701 — In Progress, not yet an earned qualification`).
- **Micro-Typography Legibility Finding (What May Not Be Ideal)**:
  - On desktop, body copy (`14px` Inter) and headings (`Space Grotesk`) have strong contrast (`#eff3e9` on `#090e0c`, `>16:1` WCAG AAA).
  - However, in the responsive CSS rules (`<= 1050px`, `<= 800px`, `<= 600px`, and `<= 360px`), many monospace labels (`.art-topline`, `.project-card-meta`, `.console-status`, `.console-bottom > span`, `.skill-level`, `.case-cover-caption`, `.footer-meta`) scale down to **`4px`–`6px`**. Browser rendering engines sub-pixel anti-alias text below `9px`, making those secondary captions unreadable on physical mobile screens.

---

## 3. Key Product Decisions & Backend / Engineering Audit

### A. Backend, Data Provenance & Service Architecture

> [!NOTE]
> The portfolio is architected as a **zero-database, static-first Single Page Application (SPA)** with cryptographic build-time verification and resilient client-side service integration.

1. **Automated Content & Cryptographic Verification (`test:content` — PASSING)**
   - Verifies all **19 project case studies** have unique slugs, explicit scope boundaries (`>30` chars), 3-step workflows, and `https:` evidence links.
   - Verifies all **26 public GitHub repositories** and **20 self-rated skills** across 4 arsenal categories.
   - Byte-verifies the **SHA-256 checksums** of all 4 PDF documents (`jefrine-correya-resume.pdf`, `jefrine-cicsa-certificate.pdf`, `jefrine-ec-council-csa-certificate.pdf`, and `jefrine-experience-certificate.pdf`) and ensures all WebP preview pages and thumbnails exist on disk.
2. **Contact Delivery Pipeline (`FormSubmit.co` AJAX)**
   - **Strengths**: Implements a `20,000ms` `AbortController` timeout, `pending.current` double-submit lock, client-side trim/whitespace validation, a hidden `company_website` honeypot field, `429` rate-limit detection, one-time activation detection, and an offline preview guard. Crucially, if any network or provider error occurs, **the user's typed message is never cleared** and a direct `mailto:jefrincorreya@gmail.com` fallback link is surfaced.
   - **Limitation to Know**: Because `FormSubmit.co` is a third-party client-side relay, strict corporate firewalls or ad-blockers can occasionally block requests to `formsubmit.co`, which triggers the built-in `Email Jefrine directly` fallback.
3. **Bundle Size & WebGL Chunking (`compile_applet` — PASSING)**
   - Vite code-splits `SpatialShowcaseEngine` into its own asynchronous chunk (`~15.6 KB` scene engine + `~519 KB` Three.js WebGL vendor chunk) so the main application shell (`~259 KB` JS, `~144 KB` CSS) loads rapidly and mounts the 3D scene asynchronously.
4. **End-to-End Test Suite Alignment (`tests/hero.spec.ts`)**
   - **Finding**: While `test:content`, `portfolio.spec.ts`, and `contact.spec.ts` match the current application, `tests/hero.spec.ts` was written for the earlier poster-first `.showcase-video` MP4 player (`expect(page.locator('.hero canvas')).toHaveCount(0)`). Now that the Hero exclusively runs the automatic 3D Live WebGL canvas with the external station bar, `tests/hero.spec.ts` should be updated if you run `npm test` in CI/CD.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Architecture & Component Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                     CLIENT APPLICATION SHELL (React Router)                  │
│  ┌──────────────────┐  ┌──────────────────────┐  ┌────────────────────────┐  │
│  │ Header & Mobile  │  │ Command Palette (⌘K) │  │ Document Room Modal    │  │
│  │ Dialog Nav       │  │ Instant Route Search │  │ (54% Default Résumé)   │  │
│  └────────┬─────────┘  └──────────┬───────────┘  └───────────┬────────────┘  │
└───────────┼───────────────────────┼──────────────────────────┼───────────────┘
            │                       │                          │
            ▼                       ▼                          ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                         PRIMARY PORTFOLIO VIEW ROUTES                        │
│                                                                              │
│  ┌────────────────────────────────────┐  ┌────────────────────────────────┐  │
│  │ 01 OVERVIEW (/)                    │  │ 02 PROJECTS (/projects & /:id) │  │
│  │ • Hero Copy & Doha Live AST Clock  │  │ • 19 Case Studies + Workflows  │  │
│  │ • 3D Live Spatial Showcase (WebGL) │  │ • Category & Keyword Filter    │  │
│  │ • External 8-Station + Inspect Bar │  │ • 26-Repo Public GitHub Index  │  │
│  │ • Local SOC Analyst Simulator      │  └────────────────────────────────┘  │
│  │ • Interactive 20-Skill Arsenal     │                                      │
│  └─────────────────┬──────────────────┘  ┌────────────────────────────────┐  │
│                    │                     │ 03 JOURNEY & 04 CREDENTIALS    │  │
│                    ▼                     │ • Verified Career Timeline     │  │
│  ┌────────────────────────────────────┐  │ • CSA & CICSA Earned Seals     │  │
│  │ Three.js SpatialShowcaseEngine     │  │ • Security+ Pursuing Disclosure│  │
│  │ • 8 Animated 1600x1000 UI Canvases │  └────────────────────────────────┘  │
│  │ • Video Texture Compositing        │                                      │
│  │ • 3D Parallax Cards & Camera Arcs  │  ┌────────────────────────────────┐  │
│  │ • 4s Focus Hold -> Auto Orbit      │  │ 05 CONTACT (/contact)          │  │
│  └────────────────────────────────────┘  │ • Honeypot + 20s Timeout Guard │  │
│                                          │ • FormSubmit AJAX -> Mailto    │  │
│                                          └────────────────────────────────┘  │
└──────────────────────────────────────────────────────┬───────────────────────┘
                                                       │
                                                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│              VERIFIED STATIC DATA & CRYPTOGRAPHIC ASSET LAYER                │
│  • 19 Project Case Studies & 26 GitHub Repos (Build-Time Verified)           │
│  • 4 SHA-256 Verified Original PDFs + High-DPI WebP Previews                 │
│  • 8 High-DPI Native Evidence Captures + 5 Interface Motion MP4 Loops        │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Priority Matrix of Optional Future Improvements

If you decide you want to apply any refinements in a future pass, here is the prioritized engineering checklist:

1. **High Impact / Quick Win — Mobile External Station Bar Labels**: Remove `.showcase-station-pill .pill-name { display: none }` at `<= 600px` and `901px–1150px` so mobile and tablet users see `01 ASTRA`, `02 SOC AI`, etc., with smooth horizontal touch scrolling.
2. **High Impact / Quick Win — Mobile Résumé Viewport Fit**: In the Document Room, detect mobile viewport widths (`<= 760px`) so the Résumé opens at `100%` container width on phones while keeping `54%` on desktop monitors.
3. **Medium Impact — Mobile Micro-Typography Floor**: Raise all `4px–6px` mobile monospace rules in `styles.css` to a minimum of `9px–10px` so every badge, log line, and caption is crisp on handheld displays.
4. **Medium Impact — Playwright Test Suite Sync**: Update `tests/hero.spec.ts` and `tests/documents.spec.ts` to assert the automatic 3D Live WebGL canvas, the 4-second station focus hold, and the `54%` default Résumé zoom.
