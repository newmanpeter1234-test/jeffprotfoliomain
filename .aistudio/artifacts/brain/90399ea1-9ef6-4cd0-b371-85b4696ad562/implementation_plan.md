# Hero 3D Showcase Refinement — Exclusive 3D Live Mode & External Station Bar

This update refines the Hero Section 1 3D Showcase based on your feedback: keeping **only the 3D Live WebGL experience** (removing the MP4 Film mode and the top-right `3D LIVE` toggle button) and moving the **interactive project station & Inspect bar outside the video frame** as a sleek horizontal dock directly underneath the showcase window.

### User Review & Critical Decisions

> [!IMPORTANT]
> Summary of the exact refinements in this plan:

- **Confirmed Decision 1 — Exclusive 3D Live Mode (Remove MP4 Film & Toggle Button)**: The Hero showcase will run exclusively on the real-time 3D WebGL Spatial Engine (`SpatialShowcaseEngine`), removing the `<video>` MP4 playback layer and removing the top-right `3D LIVE` / `MP4 FILM` switch button so the top corner of the 3D viewport stays clean.
- **Confirmed Decision 2 — External Horizontal Station & Inspect Bar Below the Window**: The bottom project station strip (`01 ASTRA`, `02 SOC AI`, `03 SPLUNK`, `04 PHISH`, `05 WAZUH`, `06 SCAN`, `07 PASS`, `08 PCAP` + `INSPECT`) is moved out of the 3D viewport overlay and placed directly below the `.showcase-window` frame as a dedicated horizontal bar that highlights each station in real time as the camera orbits through the 8 windows.

---

### 1. Overview & Core Concept

- **What It Does**:
  1. **Unobstructed 3D Viewport**: Removes the bottom dock overlay from inside the 3D stage and removes the top-right `3D LIVE` mode button, giving the 3D windows and floating parallax cards 100% breathing room inside the glass frame.
  2. **Pure 3D Live Engine**: Eliminates the redundant MP4 video element and mode toggle from the Hero showcase so it operates purely as a real-time 3D WebGL scene (with the high-DPI poster retained only for initial zero-latency load and reduced-motion accessibility fallback).
  3. **External Station & Inspect Bar**: Places a compact, high-contrast horizontal bar (`showcase-external-bar`) immediately below the 3D showcase frame. As the 3D camera moves from window to window, the corresponding station pill (`01 ASTRA` .. `08 PCAP`) highlights automatically, and visitors can click any station pill to lock the 3D camera onto that window or click `INSPECT` to open that project's full case study.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Clean 3D Stage**: Inside the `.showcase-window` frame, only the subtle top-left active station status badge (`01 / 08 · SOC SIMULATION · ASTRA Monitor`, plus an `AUTO TOUR` return chip when a station is manually pinned) and the compact bottom-right Play/Pause control remain.
  2. **Synchronized External Bar Below the Frame**: Directly beneath the 16:9 showcase frame sits the horizontal station bar matching the width of the window, styled with the portfolio's `#0b140e` obsidian-emerald surface and `#32472c` / `#c5f58a` cyber-lime accents.
  3. **Interactive Station Selection & Case Inspection**: Clicking any station (`ASTRA`, `SOC AI`, `SPLUNK`, `PHISH`, `WAZUH`, `SCAN`, `PASS`, `PCAP`) in the external bar smoothly orbits the 3D camera to that window, activates its internal UI animation and floating 3D card, and updates the right-aligned `INSPECT` action to navigate directly to `/projects/:slug`.

---

### 3. Technical Architecture & Layout Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                   HeroShowcase (.hero-showcase)                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ .showcase-window (16:9 3D Viewport Frame)                      │  │
│  │  ┌──────────────────────────────────────────────────────────┐  │  │
│  │  │ Top-Left Status Badge: "01 / 08 · SOC SIMULATION · ASTRA"│  │  │
│  │  │ (No 3D LIVE / MP4 toggle button on top-right)            │  │  │
│  │  │                                                          │  │  │
│  │  │             LIVE 3D WEBGL SCENE VIEWPORT                 │  │  │
│  │  │     (8 Animated Windows + Floating 3D Parallax Cards)    │  │  │
│  │  │                                                          │  │  │
│  │  │                                           [ Play/Pause ] │  │  │
│  │  └──────────────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ .showcase-station-dock (OUTSIDE & Directly Below Window Frame) │  │
│  │ [01 ASTRA] [02 SOC AI] [03 SPLUNK] ... [08 PCAP]  │ [INSPECT ↗]│  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```
