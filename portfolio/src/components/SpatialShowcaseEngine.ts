import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { asset } from '../hooks/useExperience';

export interface ShowcaseStation {
  id: string;
  index: number;
  title: string;
  slug: string;
  repo: string;
  category: string;
  feature: string;
  evidence: string;
  color: string;
  position: [number, number, number];
  yaw: number;
  poses: [number, number, number][];
  cardTitle: string;
  cardSubtitle: string;
  cardMetrics: [string, string][];
  cardLines: string[];
  badgeText: string;
  hasMotionVideo?: boolean;
}

export const SHOWCASE_STATIONS: ShowcaseStation[] = [
  {
    id: 'astra',
    index: 0,
    title: 'ASTRA Monitor',
    slug: 'astra-monitor',
    repo: 'ASTRA-Monitor',
    category: 'SOC SIMULATION',
    feature: 'From alert to context.',
    evidence: 'ORIGINAL UI · DEMO FIXTURES · NOT LIVE',
    color: '#c5f58a',
    position: [-18, 5, 0],
    yaw: 0.18,
    poses: [
      [5.4, 1.7, 13.8],
      [1.3, 0.45, 10.6],
      [-1.35, 0.2, 10.4],
      [-2.6, 0.85, 13.2],
    ],
    cardTitle: 'MITRE ATT&CK INVESTIGATION MODAL',
    cardSubtitle: 'ALERT #ASTR-409 · T1110 BRUTE FORCE',
    cardMetrics: [
      ['SEVERITY', 'HIGH / P1'],
      ['STATUS', 'TRIAGE ACTIVE'],
    ],
    cardLines: [
      'Correlated 14 failed auth bursts across edge gateway',
      'Mapped to MITRE T1110.001 Password Guessing',
      'Analyst playbook: isolate host & verify source ASN',
    ],
    badgeText: 'MODAL INSPECTOR · LIVE FIXTURE',
    hasMotionVideo: true,
  },
  {
    id: 'soc',
    index: 1,
    title: 'SOC Threat Detection Assistant',
    slug: 'soc-threat-detection-assistant',
    repo: 'SOC-Threat-Detection-Assistant',
    category: 'AI-ASSISTED INVESTIGATION',
    feature: 'Structure the investigation.',
    evidence: 'REAL STREAMLIT UI · EXTERNAL APIS NOT CALLED',
    color: '#9ee6b8',
    position: [-6, 7, -7],
    yaw: -0.16,
    poses: [
      [-3.8, -1.7, 12.6],
      [-0.95, -0.35, 10.5],
      [0.85, 0.75, 11.4],
      [2.2, 2.6, 14.6],
    ],
    cardTitle: 'ENRICHMENT & TRIAGE PIPELINE',
    cardSubtitle: 'SAMPLE INPUT · 192.0.2.10:443',
    cardMetrics: [
      ['PARSER', 'REGEX + IOC'],
      ['API MODE', 'OFFLINE SAFE'],
    ],
    cardLines: [
      'Extracted IPv4 192.0.2.10 (TEST-NET-1 documentation)',
      'Structured port 443 TLS session context for analyst',
      'Human-in-the-loop verification required before action',
    ],
    badgeText: 'IOC EXTRACTOR · LOCAL SAMPLE',
    hasMotionVideo: true,
  },
  {
    id: 'splunk',
    index: 2,
    title: 'Splunk SOC Lab',
    slug: 'splunk-soc-lab',
    repo: 'splunk-soc-lab',
    category: 'LOG ANALYSIS',
    feature: 'Make the logs tell a story.',
    evidence: 'ORIGINAL REPORT CAPTURE · PUBLISHED SPL SOURCE',
    color: '#b5f09e',
    position: [7, 4, -3],
    yaw: 0.14,
    poses: [
      [-4.9, 1.4, 12.8],
      [-1.8, 0.25, 10.8],
      [1.5, 0.35, 10.6],
      [3.6, 1.6, 13.5],
    ],
    cardTitle: 'PUBLISHED SPL SEARCH & AGGREGATION',
    cardSubtitle: 'INDEX=MAIN · SOURCETYPE=SYSLOG',
    cardMetrics: [
      ['SOURCE', 'UBUNTU-SERVER'],
      ['DAEMON', 'SSHD FAILED'],
    ],
    cardLines: [
      '(host="ubuntu-server" "Failed password") ssh2',
      '| stats count by user, src_ip | sort -count',
      'Identifies repeated SSH brute-force login attempts',
    ],
    badgeText: 'SPL QUERY · LAB EVIDENCE',
    hasMotionVideo: false,
  },
  {
    id: 'url',
    index: 3,
    title: 'URL Phishing Detector',
    slug: 'url-phishing-detector',
    repo: 'URL-Phishing-Detector2',
    category: 'LINK ANALYSIS',
    feature: 'Inspect before you trust.',
    evidence: 'ORIGINAL INPUT FORM · NO URL LOOKUP PERFORMED',
    color: '#a3e8c9',
    position: [19, 7, -9],
    yaw: -0.22,
    poses: [
      [6.2, 0.9, 12.2],
      [1.1, -0.1, 10.6],
      [-0.9, 0.15, 10.7],
      [-3.8, 0.55, 13.6],
    ],
    cardTitle: 'LEXICAL URL FEATURE DISSECTION',
    cardSubtitle: 'INPUT · HTTPS://EXAMPLE.INVALID',
    cardMetrics: [
      ['LEXICAL', '14 TOKENS'],
      ['LOOKUP', 'DISABLED'],
    ],
    cardLines: [
      'Inspects hostname length, subdomain depth & TLD',
      'Flags deceptive credential keywords & punycode patterns',
      'Safe Browsing API lookup gated by local credentials',
    ],
    badgeText: 'LEXICAL SCAN · FLASK UI',
    hasMotionVideo: true,
  },
  {
    id: 'wazuh',
    index: 4,
    title: 'Wazuh SIEM Lab',
    slug: 'wazuh-siem-lab',
    repo: 'wazuh-siem-lab',
    category: 'ENDPOINT INVESTIGATION',
    feature: 'Follow the endpoint evidence.',
    evidence: 'ORIGINAL REPORT CAPTURE · HISTORICAL LAB EVENTS',
    color: '#8adecf',
    position: [19, -6, -6],
    yaw: -0.15,
    poses: [
      [0.9, -3.8, 13.4],
      [0.4, -0.8, 10.9],
      [-0.4, 0.85, 10.9],
      [0.9, 3.4, 14.2],
    ],
    cardTitle: 'ENDPOINT TELEMETRY CORRELATION',
    cardSubtitle: 'WAZUH AGENT · WINDOWS LOGON EVENTS',
    cardMetrics: [
      ['RULE ID', '60122 / AUTH'],
      ['DECODER', 'WINDOWS_EVENT'],
    ],
    cardLines: [
      'Correlates Windows EventChannel logon failures',
      'Tracks agent authentication spikes across time buckets',
      'Documented in published SIEM laboratory report',
    ],
    badgeText: 'SIEM TELEMETRY · LAB CAPTURE',
    hasMotionVideo: false,
  },
  {
    id: 'scanner',
    index: 5,
    title: 'Web Vulnerability Scanner',
    slug: 'web-vulnerability-scanner',
    repo: 'web-vuln-scanner',
    category: 'AUTHORISED ASSESSMENT',
    feature: 'Define the scope first.',
    evidence: 'ORIGINAL CONFIGURATION · NO SCANS INITIATED',
    color: '#a8e0b5',
    position: [6, -7, -12],
    yaw: 0.2,
    poses: [
      [-1.1, 3.9, 14.4],
      [0.45, 0.85, 10.8],
      [-0.45, -0.7, 10.7],
      [-1.4, -2.6, 12.6],
    ],
    cardTitle: 'ASSESSMENT SCOPE & PROFILE',
    cardSubtitle: 'MODE · QUICK → COMPREHENSIVE',
    cardMetrics: [
      ['ENGINE', 'PYTHON + NMAP'],
      ['EXECUTION', 'SAFE PREVIEW'],
    ],
    cardLines: [
      'Validates target scope & HTTP security response headers',
      'Switches scan profile without initiating external traffic',
      'Built strictly for authorised laboratory targets',
    ],
    badgeText: 'SCOPE CONFIG · NO ACTIVE SCAN',
    hasMotionVideo: true,
  },
  {
    id: 'passchecker',
    index: 6,
    title: 'PassChecker',
    slug: 'passchecker',
    repo: 'password_strength_checker',
    category: 'PASSWORD HYGIENE',
    feature: 'Better habits. Local feedback.',
    evidence: 'WORKING LOCAL HEURISTIC · SYNTHETIC INPUT ONLY',
    color: '#d4f799',
    position: [-7, -5, -5],
    yaw: -0.17,
    poses: [
      [-4.4, 0.9, 13.3],
      [-1.25, -0.35, 10.6],
      [0.75, 0.3, 10.4],
      [2.3, 1.5, 13.6],
    ],
    cardTitle: 'CLIENT-SIDE ENTROPY HEURISTIC',
    cardSubtitle: 'SYNTHETIC INPUT · 22 CHARS',
    cardMetrics: [
      ['METER', '100% / STRONG'],
      ['NETWORK', 'ZERO CALLS'],
    ],
    cardLines: [
      'Evaluates length, character diversity & common patterns',
      'Transitions from weak ("abc") to strong synthetic sample',
      'Runs 100% locally in browser memory',
    ],
    badgeText: 'LOCAL HEURISTIC · LIVE METER',
    hasMotionVideo: true,
  },
  {
    id: 'wireshark',
    index: 7,
    title: 'Wireshark Network Traffic Analysis',
    slug: 'wireshark-traffic-analysis',
    repo: 'wireshark-network-traffic-analysis',
    category: 'PACKET ANALYSIS',
    feature: 'Go beneath the surface.',
    evidence: 'PUBLISHED PACKET CAPTURE · ADDRESS FIELDS REDACTED',
    color: '#98dbbe',
    position: [-20, -7, -10],
    yaw: 0.19,
    poses: [
      [4.6, 2.5, 14.0],
      [1.3, 0.3, 10.7],
      [-0.9, 0.75, 11.1],
      [-2.2, 2.9, 15.2],
    ],
    cardTitle: 'PROTOCOL FRAME DISSECTION',
    cardSubtitle: 'PCAP EVIDENCE · REDACTED ENDPOINTS',
    cardMetrics: [
      ['LAYER', 'TCP / TLS / DNS'],
      ['PRIVACY', 'MASKED IPs'],
    ],
    cardLines: [
      'Inspects packet sequence, handshake flags & payload offsets',
      'Sensitive MAC, SSID, SNI & host addresses redacted',
      'Captured from controlled laboratory network trace',
    ],
    badgeText: 'PCAP DISSECTOR · PRIVACY MASKED',
    hasMotionVideo: false,
  },
];

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const smooth = (v: number) => {
  const x = clamp(v);
  return x * x * x * (x * (x * 6 - 15) + 10);
};
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const mix = (a: number[], b: number[], t: number): [number, number, number] => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];

export function localToWorld(station: ShowcaseStation, point: [number, number, number]): [number, number, number] {
  const [x, y, z] = point;
  const c = Math.cos(station.yaw);
  const s = Math.sin(station.yaw);
  return [
    station.position[0] + x * c + z * s,
    station.position[1] + y,
    station.position[2] - x * s + z * c,
  ];
}

interface CameraKey {
  station?: string;
  time: number;
  position: [number, number, number];
  target: [number, number, number];
  roll: number;
  fov: number;
}

const STATION_DURATION = 3.2; // 8 stations * 3.2s = 25.6s full seamless loop
export const TOUR_DURATION = SHOWCASE_STATIONS.length * STATION_DURATION;

function buildCameraKeys(): CameraKey[] {
  const keys: CameraKey[] = [];
  SHOWCASE_STATIONS.forEach((p, i) => {
    const start = i * STATION_DURATION;
    const offsets = [0.0, 0.72, 2.25, 2.95];
    const rolls = [0.022 * (i % 2 === 0 ? 1 : -1), 0.008, -0.012, -0.02 * (i % 2 === 0 ? 1 : -1)];
    const fovs = [43.5, 39.5, 39.0, 42.5];
    offsets.forEach((offset, j) => {
      keys.push({
        station: p.id,
        time: start + offset,
        position: localToWorld(p, p.poses[j]),
        target: localToWorld(p, [j === 1 || j === 2 ? 0.18 : 0, -0.38, j === 1 || j === 2 ? 0.35 : 0]),
        roll: rolls[j],
        fov: fovs[j],
      });
    });
  });
  // Close the loop seamlessly to station 0 keyframe 0
  keys.push({
    ...keys[0],
    time: TOUR_DURATION,
  });
  return keys;
}

const CAMERA_KEYS = buildCameraKeys();

export interface TourState {
  time: number;
  duration: number;
  stationIndex: number;
  station: ShowcaseStation;
  local: number; // 0..STATION_DURATION
  progress: number; // 0..1 within station
  opacity: number;
  position: [number, number, number];
  target: [number, number, number];
  roll: number;
  fov: number;
}

export function sampleTourState(rawTime: number, focusedStationIndex: number | null = null): TourState {
  if (focusedStationIndex !== null) {
    const st = SHOWCASE_STATIONS[clamp(focusedStationIndex, 0, SHOWCASE_STATIONS.length - 1)];
    // Gentle orbital breathing while inspecting a focused station
    const cycle = (rawTime % 5.0) / 5.0;
    const wave = 0.5 + 0.5 * Math.sin(cycle * Math.PI * 2);
    const pos = mix(localToWorld(st, st.poses[1]), localToWorld(st, st.poses[2]), wave);
    const tgt = localToWorld(st, [lerp(-0.1, 0.22, wave), -0.35, 0.35]);
    return {
      time: rawTime,
      duration: TOUR_DURATION,
      stationIndex: st.index,
      station: st,
      local: 1.5 + 0.6 * Math.sin(cycle * Math.PI * 2),
      progress: cycle,
      opacity: 1,
      position: pos,
      target: tgt,
      roll: 0.008 * Math.cos(cycle * Math.PI * 2),
      fov: 39.2,
    };
  }

  const t = ((rawTime % TOUR_DURATION) + TOUR_DURATION) % TOUR_DURATION;
  const stationIndex = Math.min(SHOWCASE_STATIONS.length - 1, Math.floor(t / STATION_DURATION));
  const station = SHOWCASE_STATIONS[stationIndex];
  const local = t - stationIndex * STATION_DURATION;
  const progress = clamp(local / STATION_DURATION, 0, 1);
  const opacity = smooth((local - 0.1) / 0.35) * (1 - smooth((local - (STATION_DURATION - 0.42)) / 0.38));

  const idx = CAMERA_KEYS.findIndex((k) => k.time > t);
  const a = CAMERA_KEYS[Math.max(0, idx - 1)];
  const b = CAMERA_KEYS[Math.max(1, idx)];
  const span = Math.max(0.0001, b.time - a.time);
  const u = smooth((t - a.time) / span);
  const target = mix(a.target, b.target, u);
  let position = mix(a.position, b.position, u);

  if (a.station && a.station === b.station) {
    const va = a.position.map((x, i) => x - a.target[i]);
    const vb = b.position.map((x, i) => x - b.target[i]);
    const ra = Math.hypot(...va);
    const rb = Math.hypot(...vb);
    const na = va.map((x) => x / ra);
    const nb = vb.map((x) => x / rb);
    const dot = clamp(na[0] * nb[0] + na[1] * nb[1] + na[2] * nb[2], -1, 1);
    const angle = Math.acos(dot);
    const dir =
      angle < 0.0001
        ? mix(na, nb, u)
        : ([
            (na[0] * Math.sin((1 - u) * angle) + nb[0] * Math.sin(u * angle)) / Math.sin(angle),
            (na[1] * Math.sin((1 - u) * angle) + nb[1] * Math.sin(u * angle)) / Math.sin(angle),
            (na[2] * Math.sin((1 - u) * angle) + nb[2] * Math.sin(u * angle)) / Math.sin(angle),
          ] as [number, number, number]);
    const radius = lerp(ra, rb, u);
    position = [target[0] + dir[0] * radius, target[1] + dir[1] * radius, target[2] + dir[2] * radius];
  }

  return {
    time: t,
    duration: TOUR_DURATION,
    stationIndex,
    station,
    local,
    progress,
    opacity,
    position,
    target,
    roll: lerp(a.roll, b.roll, u),
    fov: lerp(a.fov, b.fov, u),
  };
}

export function detectSoftwareWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

function roundedRectShape(w: number, h: number, r: number): THREE.Shape {
  const x = -w / 2;
  const y = -h / 2;
  const s = new THREE.Shape();
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function createWindowChromeTexture(station: ShowcaseStation, maxAnisotropy: number): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 1600;
  c.height = 76;
  const ctx = c.getContext('2d')!;
  const g = ctx.createLinearGradient(0, 0, 0, 76);
  g.addColorStop(0, '#18241b');
  g.addColorStop(1, '#0e1610');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 1600, 76);

  // Subtle bottom border line in cyber-lime tint
  ctx.fillStyle = 'rgba(197, 245, 138, 0.22)';
  ctx.fillRect(0, 73, 1600, 3);

  // Window traffic dots
  const dotColors = ['#b68d6a', '#b4ac73', '#c5f58a'];
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = dotColors[i];
    ctx.beginPath();
    ctx.arc(34 + i * 22, 38, 5.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Station index + repo identifier
  ctx.font = '500 20px "IBM Plex Mono", monospace';
  ctx.fillStyle = '#c5f58a';
  const indexLabel = `0${station.index + 1}`;
  ctx.fillText(indexLabel, 118, 45);

  ctx.fillStyle = '#536850';
  ctx.fillText('/', 154, 45);

  ctx.fillStyle = '#dce6d5';
  ctx.fillText(`jeff-1217/${station.repo}`, 176, 45);

  // Right-side category + status pill
  ctx.font = '500 18px "IBM Plex Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillStyle = '#9cb292';
  ctx.fillText(`${station.category}  ·  ${station.badgeText}`, 1564, 45);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

function createParallaxCardTexture(station: ShowcaseStation, detailImg: HTMLImageElement | null, maxAnisotropy: number): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 1120;
  c.height = 680;
  const ctx = c.getContext('2d')!;

  // Deep obsidian-emerald card surface
  const bg = ctx.createLinearGradient(0, 0, 1120, 680);
  bg.addColorStop(0, 'rgba(15, 25, 18, 0.96)');
  bg.addColorStop(1, 'rgba(9, 15, 11, 0.98)');
  drawRoundedRect(ctx, 4, 4, 1112, 672, 22);
  ctx.fillStyle = bg;
  ctx.fill();

  // Outer border
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(197, 245, 138, 0.48)';
  ctx.stroke();

  // Top header bar
  ctx.fillStyle = 'rgba(26, 41, 29, 0.92)';
  drawRoundedRect(ctx, 8, 8, 1104, 76, 18);
  ctx.fill();

  // Accent bar at top
  const topGlow = ctx.createLinearGradient(80, 0, 1040, 0);
  topGlow.addColorStop(0, 'rgba(197, 245, 138, 0)');
  topGlow.addColorStop(0.5, station.color);
  topGlow.addColorStop(1, 'rgba(197, 245, 138, 0)');
  ctx.fillStyle = topGlow;
  ctx.fillRect(80, 6, 960, 4);

  // Header text
  ctx.font = '600 22px "IBM Plex Mono", monospace';
  ctx.fillStyle = station.color;
  ctx.fillText(`+ ${station.cardTitle}`, 38, 54);

  ctx.textAlign = 'right';
  ctx.font = '500 18px "IBM Plex Mono", monospace';
  ctx.fillStyle = '#9bb291';
  ctx.fillText(station.cardSubtitle, 1080, 54);
  ctx.textAlign = 'left';

  if (station.id === 'astra' && detailImg) {
    // Draw the real ASTRA investigation modal capture inside the framed 3D card
    ctx.save();
    drawRoundedRect(ctx, 28, 104, 1064, 430, 12);
    ctx.clip();
    ctx.drawImage(detailImg, 28, 104, 1064, 430);
    ctx.restore();
    ctx.strokeStyle = 'rgba(197, 245, 138, 0.28)';
    ctx.lineWidth = 2;
    drawRoundedRect(ctx, 28, 104, 1064, 430, 12);
    ctx.stroke();

    // Bottom context strip
    ctx.font = '500 20px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#d8e8c8';
    ctx.fillText('MITRE ATT&CK T1110.001 · Verified Modal Overlay · Dismissible View', 36, 585);
    ctx.font = '400 18px Inter, sans-serif';
    ctx.fillStyle = '#95aa85';
    ctx.fillText('Authentic investigation modal from the ASTRA Monitor repository.', 36, 625);
  } else {
    // Metric boxes row
    station.cardMetrics.forEach(([label, val], idx) => {
      const bx = 36 + idx * 528;
      const by = 112;
      drawRoundedRect(ctx, bx, by, 508, 118, 12);
      ctx.fillStyle = 'rgba(22, 35, 24, 0.88)';
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(155, 190, 130, 0.28)';
      ctx.stroke();

      ctx.font = '500 17px "IBM Plex Mono", monospace';
      ctx.fillStyle = '#8fa683';
      ctx.fillText(label, bx + 26, by + 42);

      ctx.font = '600 32px "Space Grotesk", sans-serif';
      ctx.fillStyle = idx === 0 ? station.color : '#eff3e9';
      ctx.fillText(val, bx + 26, by + 88);
    });

    // Evidence lines
    ctx.font = '500 18px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#95aa85';
    ctx.fillText('ACTIVE INSPECTION CONTEXT', 38, 282);

    station.cardLines.forEach((line, idx) => {
      const ly = 310 + idx * 96;
      drawRoundedRect(ctx, 36, ly, 1048, 76, 10);
      ctx.fillStyle = idx === 0 ? 'rgba(34, 54, 34, 0.78)' : 'rgba(18, 29, 20, 0.72)';
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = idx === 0 ? 'rgba(197, 245, 138, 0.42)' : 'rgba(120, 150, 110, 0.2)';
      ctx.stroke();

      ctx.font = '600 20px "IBM Plex Mono", monospace';
      ctx.fillStyle = station.color;
      ctx.fillText(`0${idx + 1}`, 62, ly + 46);

      ctx.font = idx === 0 && station.id === 'splunk' ? '500 22px "IBM Plex Mono", monospace' : '500 23px Inter, sans-serif';
      ctx.fillStyle = '#e5efe0';
      ctx.fillText(line, 112, ly + 46);
    });

    // Bottom provenance bar
    ctx.font = '500 17px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#8ca37d';
    ctx.fillText(station.evidence, 38, 636);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

function createBadgeTexture(station: ShowcaseStation, maxAnisotropy: number): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 640;
  c.height = 96;
  const ctx = c.getContext('2d')!;

  drawRoundedRect(ctx, 4, 4, 632, 88, 16);
  ctx.fillStyle = 'rgba(14, 24, 16, 0.94)';
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = 'rgba(197, 245, 138, 0.52)';
  ctx.stroke();

  // Accent indicator bar on left
  drawRoundedRect(ctx, 22, 24, 8, 48, 4);
  ctx.fillStyle = station.color;
  ctx.fill();

  ctx.font = '600 21px "IBM Plex Mono", monospace';
  ctx.fillStyle = '#eff3e9';
  ctx.fillText(station.title.toUpperCase(), 48, 44);

  ctx.font = '500 16px "IBM Plex Mono", monospace';
  ctx.fillStyle = station.color;
  ctx.fillText(station.feature.toUpperCase(), 48, 72);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

/**
 * Draws the live in-window animated interface overlay onto each project window's 1600x1000 screen canvas.
 * Combines the real project base screenshot (and real video frames when playing) with active UI interactions:
 * typing inputs, row scan highlights, strength meters, radar sweeps, and focus reticles.
 */
function renderAnimatedWindowScreen(
  ctx: CanvasRenderingContext2D,
  station: ShowcaseStation,
  baseImage: HTMLImageElement | null,
  videoEl: HTMLVideoElement | null,
  localTime: number,
  isFocused: boolean
) {
  const W = 1600;
  const H = 1000;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#090e0c';
  ctx.fillRect(0, 0, W, H);

  // 1. Draw either the live interface-motion video frame (if ready and playing) or the crisp high-DPI base capture
  const source: CanvasImageSource | null =
    videoEl && videoEl.readyState >= 2 && videoEl.videoWidth > 0 ? videoEl : baseImage;

  if (source) {
    const sw = source instanceof HTMLVideoElement ? source.videoWidth : source.width;
    const sh = source instanceof HTMLVideoElement ? source.videoHeight : source.height;
    const scale = Math.min(W / sw, H / sh);
    const dw = sw * scale;
    const dh = sh * scale;
    const dx = (W - dw) / 2;
    const dy = (H - dh) / 2;
    ctx.drawImage(source, dx, dy, dw, dh);
  }

  // Normalized animation cycle (0..1) while the camera visits this station
  const phase = clamp(localTime / STATION_DURATION, 0, 1);
  const pulse = 0.5 + 0.5 * Math.sin(localTime * 3.2);

  // 2. Project-specific in-window live UI animations so NO window is ever just a static image
  ctx.save();
  if (station.id === 'astra') {
    // Animated alert row highlight & live radar sweep overlay
    const rowY = 290 + Math.floor((phase * 4) % 4) * 58;
    ctx.fillStyle = 'rgba(197, 245, 138, 0.12)';
    ctx.fillRect(68, rowY, 980, 48);
    ctx.strokeStyle = 'rgba(197, 245, 138, 0.65)';
    ctx.lineWidth = 2;
    ctx.strokeRect(68, rowY, 980, 48);

    // Animated telemetry radar in top-right corner of screen
    const rx = 1430;
    const ry = 165;
    const rr = 88;
    ctx.beginPath();
    ctx.arc(rx, ry, rr, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(11, 20, 14, 0.82)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(197, 245, 138, 0.45)';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(rx, ry, rr * 0.58, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(197, 245, 138, 0.22)';
    ctx.stroke();

    const sweepAngle = localTime * 2.4;
    ctx.beginPath();
    ctx.moveTo(rx, ry);
    ctx.arc(rx, ry, rr - 3, sweepAngle, sweepAngle + 0.65);
    ctx.closePath();
    ctx.fillStyle = 'rgba(197, 245, 138, 0.28)';
    ctx.fill();
  } else if (station.id === 'soc') {
    // Live typewriter log entry + structured enrichment step bar
    const sampleText = 'Documentation sample: connection from 192.0.2.10 on port 443 (TLSv1.3)';
    const chars = Math.floor(clamp((phase - 0.08) / 0.55, 0, 1) * sampleText.length);
    const typed = sampleText.slice(0, chars);

    drawRoundedRect(ctx, 84, 740, 1432, 180, 14);
    ctx.fillStyle = 'rgba(11, 19, 14, 0.92)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(158, 230, 184, 0.55)';
    ctx.stroke();

    ctx.font = '600 18px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#9ee6b8';
    ctx.fillText('LIVE LOG PARSER INPUT · OFFLINE DOCUMENTATION SAMPLE', 114, 782);

    ctx.font = '500 23px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#eff3e9';
    ctx.fillText(`> ${typed}${pulse > 0.45 ? '▋' : ''}`, 114, 832);

    // Pipeline pills
    const steps = ['01. PARSE RAW LOG', '02. EXTRACT IOC (192.0.2.10)', '03. ANALYST REVIEW READY'];
    steps.forEach((st, idx) => {
      const active = phase >= idx * 0.28;
      const sx = 114 + idx * 455;
      drawRoundedRect(ctx, sx, 858, 430, 42, 8);
      ctx.fillStyle = active ? 'rgba(158, 230, 184, 0.2)' : 'rgba(25, 38, 28, 0.7)';
      ctx.fill();
      ctx.strokeStyle = active ? '#9ee6b8' : 'rgba(158, 230, 184, 0.22)';
      ctx.stroke();
      ctx.font = '600 16px "IBM Plex Mono", monospace';
      ctx.fillStyle = active ? '#eff3e9' : '#7f9682';
      ctx.fillText(st, sx + 18, 885);
    });
  } else if (station.id === 'splunk') {
    // Animated SPL query bar + failed login row scanner + histogram bars
    const splQuery = '(host="ubuntu-server" "Failed password") ssh2 | stats count by user, src_ip';
    const chars = Math.floor(clamp(phase / 0.5, 0, 1) * splQuery.length);

    drawRoundedRect(ctx, 64, 54, 1472, 92, 12);
    ctx.fillStyle = 'rgba(10, 18, 12, 0.92)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(181, 240, 158, 0.58)';
    ctx.stroke();

    ctx.font = '600 16px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#b5f09e';
    ctx.fillText('SPLUNK SEARCH & REPORTING · PUBLISHED SPL QUERY', 92, 84);

    ctx.font = '500 22px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#eff3e9';
    ctx.fillText(splQuery.slice(0, chars), 92, 122);

    // Animated inspection scan highlight across the log rows
    const scanY = 230 + ((phase * 520) % 520);
    const scanGrad = ctx.createLinearGradient(0, scanY - 28, 0, scanY + 28);
    scanGrad.addColorStop(0, 'rgba(197, 245, 138, 0)');
    scanGrad.addColorStop(0.5, 'rgba(197, 245, 138, 0.18)');
    scanGrad.addColorStop(1, 'rgba(197, 245, 138, 0)');
    ctx.fillStyle = scanGrad;
    ctx.fillRect(64, scanY - 28, 1472, 56);
  } else if (station.id === 'url') {
    // Animated URL lexical inspection bar
    const urlSample = 'https://example.invalid/account-verify/session-login';
    const chars = Math.floor(clamp((phase - 0.05) / 0.5, 0, 1) * urlSample.length);

    drawRoundedRect(ctx, 90, 720, 1420, 200, 14);
    ctx.fillStyle = 'rgba(10, 19, 15, 0.93)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(163, 232, 201, 0.55)';
    ctx.stroke();

    ctx.font = '600 17px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#a3e8c9';
    ctx.fillText('LEXICAL TOKEN INSPECTOR · NO EXTERNAL API LOOKUP', 122, 762);

    ctx.font = '500 25px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#eff3e9';
    ctx.fillText(urlSample.slice(0, chars), 122, 812);

    const tokens = ['SCHEME: HTTPS', 'HOST: EXAMPLE.INVALID', 'PATH DEPTH: 2', 'KEYWORDS: VERIFY / LOGIN'];
    tokens.forEach((tk, idx) => {
      const active = phase > 0.2 + idx * 0.14;
      const tx = 122 + idx * 340;
      drawRoundedRect(ctx, tx, 842, 320, 48, 8);
      ctx.fillStyle = active ? 'rgba(163, 232, 201, 0.18)' : 'rgba(20, 32, 25, 0.7)';
      ctx.fill();
      ctx.strokeStyle = active ? '#a3e8c9' : 'rgba(163, 232, 201, 0.2)';
      ctx.stroke();
      ctx.font = '600 16px "IBM Plex Mono", monospace';
      ctx.fillStyle = active ? '#eff3e9' : '#7f988b';
      ctx.fillText(tk, tx + 16, 872);
    });
  } else if (station.id === 'wazuh') {
    // Animated endpoint event row focus & live event histogram bar
    const rowIdx = Math.floor((phase * 5) % 5);
    const ry = 420 + rowIdx * 66;
    ctx.fillStyle = 'rgba(138, 222, 207, 0.14)';
    ctx.fillRect(64, ry, 1472, 54);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(138, 222, 207, 0.65)';
    ctx.strokeRect(64, ry, 1472, 54);

    // Top telemetry status strip
    drawRoundedRect(ctx, 64, 48, 1472, 74, 10);
    ctx.fillStyle = 'rgba(10, 19, 17, 0.9)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(138, 222, 207, 0.48)';
    ctx.stroke();
    ctx.font = '600 19px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#8adecf';
    ctx.fillText(`WAZUH THREAT HUNTING · INSPECTING LOGON EVENT ROW #0${rowIdx + 1} · RULE 60122`, 94, 92);
  } else if (station.id === 'scanner') {
    // Animated scope configuration & mode switch (Quick -> Comprehensive)
    const isComprehensive = phase > 0.42;
    drawRoundedRect(ctx, 90, 725, 1420, 195, 14);
    ctx.fillStyle = 'rgba(11, 20, 14, 0.93)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(168, 224, 181, 0.55)';
    ctx.stroke();

    ctx.font = '600 17px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#a8e0b5';
    ctx.fillText('AUTHORISED TARGET SCOPE CONFIGURATION · SAFE PREVIEW', 122, 766);

    ctx.font = '500 24px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#eff3e9';
    ctx.fillText('Target URI: https://example.invalid:443', 122, 814);

    // Mode toggle pills
    const modes = ['QUICK PROFILE (HEADERS + TLS)', 'COMPREHENSIVE PROFILE (NMAP + OWASP)'];
    modes.forEach((m, idx) => {
      const selected = (idx === 0 && !isComprehensive) || (idx === 1 && isComprehensive);
      const mx = 122 + idx * 670;
      drawRoundedRect(ctx, mx, 842, 640, 50, 9);
      ctx.fillStyle = selected ? 'rgba(197, 245, 138, 0.24)' : 'rgba(22, 34, 24, 0.72)';
      ctx.fill();
      ctx.strokeStyle = selected ? '#c5f58a' : 'rgba(168, 224, 181, 0.22)';
      ctx.stroke();
      ctx.font = '600 18px "IBM Plex Mono", monospace';
      ctx.fillStyle = selected ? '#c5f58a' : '#89a18d';
      ctx.fillText(selected ? `● ${m}` : `○ ${m}`, mx + 22, 873);
    });
  } else if (station.id === 'passchecker') {
    // Animated password strength meter bar & entropy evaluation
    const strongPhase = clamp((phase - 0.22) / 0.45, 0, 1);
    const meterRatio = lerp(0.24, 1.0, smooth(strongPhase));

    drawRoundedRect(ctx, 90, 710, 1420, 210, 14);
    ctx.fillStyle = 'rgba(12, 21, 12, 0.94)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(212, 247, 153, 0.58)';
    ctx.stroke();

    ctx.font = '600 17px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#d4f799';
    ctx.fillText('LOCAL PASSWORD ENTROPY HEURISTIC · SYNTHETIC SAMPLE', 124, 752);

    ctx.font = '600 26px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#eff3e9';
    const sampleDisplay = strongPhase < 0.25 ? '••• (Use at least 8 characters)' : '•••••••••••••••••••••• (Showcase-Example-2026!)';
    ctx.fillText(sampleDisplay, 124, 804);

    // Meter track
    drawRoundedRect(ctx, 124, 832, 1352, 24, 12);
    ctx.fillStyle = 'rgba(32, 48, 30, 0.9)';
    ctx.fill();

    // Meter fill
    drawRoundedRect(ctx, 124, 832, Math.max(40, 1352 * meterRatio), 24, 12);
    ctx.fillStyle = strongPhase < 0.35 ? '#eab308' : '#c5f58a';
    ctx.fill();

    ctx.font = '500 18px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#b9d1a4';
    ctx.fillText(
      strongPhase < 0.35
        ? 'STATUS: WEAK SAMPLE · LENGTH < 8 CHARS'
        : 'STATUS: EXCELLENT PASSWORD · UPPER + LOWER + DIGIT + SYMBOL VERIFIED',
      124,
      892
    );
  } else if (station.id === 'wireshark') {
    // Animated packet frame dissector sweep
    const pktIdx = Math.floor((phase * 6) % 6);
    const py = 165 + pktIdx * 46;
    ctx.fillStyle = 'rgba(152, 219, 190, 0.18)';
    ctx.fillRect(48, py, 1504, 40);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(197, 245, 138, 0.72)';
    ctx.strokeRect(48, py, 1504, 40);

    // Bottom hex/frame dissection callout bar
    drawRoundedRect(ctx, 64, 760, 1472, 165, 12);
    ctx.fillStyle = 'rgba(9, 17, 14, 0.93)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(152, 219, 190, 0.52)';
    ctx.stroke();

    ctx.font = '600 18px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#98dbbe';
    ctx.fillText(`FRAME #${104 + pktIdx} DISSECTION · PROTOCOL: TLSv1.2 / TCP · ENDPOINTS REDACTED`, 96, 804);

    ctx.font = '500 20px "IBM Plex Mono", monospace';
    ctx.fillStyle = '#eff3e9';
    ctx.fillText('0000  16 03 03 00 8b 01 00 00 87 03 03 5f 8c a1 2b 90   ..........._..+.', 96, 850);
    ctx.fillStyle = '#95aa85';
    ctx.fillText('0010  [REDACTED MAC / IP HEADER] -> [CONTROLLED LAB CAPTURE VERIFIED]', 96, 890);
  }
  ctx.restore();

  // 3. Subtle emerald/lime active border glow around the screen canvas when active/focused
  ctx.save();
  ctx.strokeStyle = isFocused ? 'rgba(197, 245, 138, 0.65)' : 'rgba(197, 245, 138, 0.25)';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, W - 4, H - 4);
  ctx.restore();
}

export interface SpatialPanelHandle {
  station: ShowcaseStation;
  group: THREE.Group;
  update(state: TourState, focusedStationIndex: number | null): void;
  dispose(): void;
}

const FRAME_OUTLINE = roundedRectShape(9.96, 6.65, 0.15);
const HOLE_POINTS = roundedRectShape(9.62, 6.3, 0.1)
  .getPoints(8)
  .reverse()
  .map((p) => new THREE.Vector2(p.x, p.y + 0.02));
const HOLE_PATH = new THREE.Path(HOLE_POINTS);
HOLE_PATH.closePath();
FRAME_OUTLINE.holes.push(HOLE_PATH);

const SHARED_FRAME_GEOMETRY = new THREE.ExtrudeGeometry(FRAME_OUTLINE, {
  depth: 0.2,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.05,
  bevelSegments: 2,
  curveSegments: 6,
  steps: 1,
});
const SHARED_EDGE_GEOMETRY = new THREE.EdgesGeometry(new THREE.BoxGeometry(9.98, 6.67, 0.22));
const SHARED_CARD_EDGE_GEOMETRY = new THREE.EdgesGeometry(new THREE.BoxGeometry(5.62, 3.42, 0.08));

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export async function createSpatialPanel(
  station: ShowcaseStation,
  maxAnisotropy: number
): Promise<SpatialPanelHandle> {
  const group = new THREE.Group();
  group.position.fromArray(station.position);
  group.rotation.y = station.yaw;
  group.userData.stationIndex = station.index;

  // 1. Beveled Anodized Dark-Emerald Frame (matches website #090e0c / #111813 / #c5f58a theme)
  const frameMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x131f16,
    metalness: 0.34,
    roughness: 0.22,
    clearcoat: 1.0,
    clearcoatRoughness: 0.14,
    envMapIntensity: 0.85,
    transparent: true,
    opacity: 0.96,
  });
  const frameMesh = new THREE.Mesh(SHARED_FRAME_GEOMETRY, frameMaterial);
  frameMesh.position.z = -0.22;
  group.add(frameMesh);

  // Backing plane
  const backingMat = new THREE.MeshBasicMaterial({
    color: 0x090e0c,
    transparent: true,
    opacity: 0.98,
  });
  const backingMesh = new THREE.Mesh(new THREE.PlaneGeometry(9.64, 6.04), backingMat);
  backingMesh.position.set(0, -0.14, 0.02);
  group.add(backingMesh);

  // Load high-DPI base screenshot + optional ASTRA detail image
  const [baseImage, astraDetailImage] = await Promise.all([
    loadImage(asset(`/native-evidence/${station.id}.webp`)),
    station.id === 'astra' ? loadImage(asset('/native-evidence/astra-detail.webp')) : Promise.resolve(null),
  ]);

  // Optional HTMLVideoElement for genuine captured UI motion
  let videoEl: HTMLVideoElement | null = null;
  if (station.hasMotionVideo) {
    videoEl = document.createElement('video');
    videoEl.src = asset(`/interface-motion/${station.id}.mp4`);
    videoEl.muted = true;
    videoEl.loop = true;
    videoEl.playsInline = true;
    videoEl.crossOrigin = 'anonymous';
    videoEl.preload = 'auto';
  }

  // 2. Dynamic Screen CanvasTexture (1600x1000)
  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 1600;
  screenCanvas.height = 1000;
  const screenCtx = screenCanvas.getContext('2d')!;
  renderAnimatedWindowScreen(screenCtx, station, baseImage, videoEl, 0, false);

  const screenTexture = new THREE.CanvasTexture(screenCanvas);
  screenTexture.colorSpace = THREE.SRGBColorSpace;
  screenTexture.anisotropy = maxAnisotropy;
  screenTexture.minFilter = THREE.LinearFilter;
  screenTexture.magFilter = THREE.LinearFilter;

  const screenMat = new THREE.MeshBasicMaterial({
    map: screenTexture,
    transparent: true,
    toneMapped: false,
  });
  const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(9.58, 5.98), screenMat);
  screenMesh.position.set(0, -0.14, 0.04);
  group.add(screenMesh);

  // 3. Window Chrome Header
  const chromeTexture = createWindowChromeTexture(station, maxAnisotropy);
  const chromeMat = new THREE.MeshBasicMaterial({
    map: chromeTexture,
    transparent: true,
    toneMapped: false,
  });
  const chromeMesh = new THREE.Mesh(new THREE.PlaneGeometry(9.6, 0.45), chromeMat);
  chromeMesh.position.set(0, 3.07, 0.055);
  group.add(chromeMesh);

  // 4. Cyber-Lime Specular Wireframe Edge
  const edgeMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(station.color),
    transparent: true,
    opacity: 0.28,
  });
  const edgeLines = new THREE.LineSegments(SHARED_EDGE_GEOMETRY, edgeMat);
  edgeLines.position.z = -0.1;
  group.add(edgeLines);

  // 5. Floating 3D Parallax Detail Card (for EVERY station, rising in Z-space when active)
  const floatingGroup = new THREE.Group();
  const cardSide = station.index % 2 === 0 ? 1.55 : -1.55;
  floatingGroup.position.set(cardSide, -0.35, 1.32);

  const cardTexture = createParallaxCardTexture(station, astraDetailImage, maxAnisotropy);
  const cardMat = new THREE.MeshBasicMaterial({
    map: cardTexture,
    transparent: true,
    toneMapped: false,
    depthWrite: false,
  });
  const cardMesh = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 3.4), cardMat);
  cardMesh.renderOrder = 4;
  floatingGroup.add(cardMesh);

  const cardEdgeMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(station.color),
    transparent: true,
    opacity: 0.45,
  });
  const cardEdge = new THREE.LineSegments(SHARED_CARD_EDGE_GEOMETRY, cardEdgeMat);
  cardEdge.renderOrder = 5;
  floatingGroup.add(cardEdge);
  group.add(floatingGroup);

  // 6. Secondary Floating 3D Telemetry Badge (opposite top corner in Z-space)
  const badgeTexture = createBadgeTexture(station, maxAnisotropy);
  const badgeMat = new THREE.MeshBasicMaterial({
    map: badgeTexture,
    transparent: true,
    toneMapped: false,
    depthWrite: false,
  });
  const badgeMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 0.52), badgeMat);
  badgeMesh.position.set(-cardSide * 1.45, 2.25, 0.78);
  badgeMesh.renderOrder = 4;
  group.add(badgeMesh);

  let lastRedrawTime = -1;
  let videoPlaying = false;

  return {
    station,
    group,
    update(state: TourState, focusedStationIndex: number | null) {
      const isCurrent = state.station.id === station.id;
      const isFocused = focusedStationIndex === station.index;
      const activeWeight = isFocused ? 1 : isCurrent ? state.opacity : 0;
      const brightness = 0.22 + 0.78 * activeWeight;

      frameMaterial.opacity = 0.96 * brightness;
      backingMat.opacity = 0.98 * brightness;
      screenMat.opacity = brightness;
      chromeMat.opacity = brightness;
      edgeMat.opacity = (isCurrent || isFocused ? 0.55 : 0.16) * brightness;

      // Play/pause the station's motion video only while this station is active
      if (videoEl) {
        if ((isCurrent || isFocused) && !videoPlaying) {
          videoPlaying = true;
          videoEl.play().catch(() => {});
        } else if (!isCurrent && !isFocused && videoPlaying) {
          videoPlaying = false;
          videoEl.pause();
        }
      }

      // Redraw the active station's animated canvas at ~30fps to keep GPU texture uploads light and crisp
      if ((isCurrent || isFocused) && Math.abs(state.time - lastRedrawTime) > 0.03) {
        lastRedrawTime = state.time;
        renderAnimatedWindowScreen(screenCtx, station, baseImage, videoEl, state.local, isFocused);
        screenTexture.needsUpdate = true;
      }

      // Animate the 3D Floating Parallax Card & Secondary Telemetry Badge in Z-space
      const modalAmount = isFocused
        ? 1
        : isCurrent
        ? smooth((state.local - 0.38) / 0.48) * (1 - smooth((state.local - (STATION_DURATION - 0.55)) / 0.42))
        : 0;

      floatingGroup.visible = modalAmount > 0.005;
      badgeMesh.visible = modalAmount > 0.005;

      if (floatingGroup.visible) {
        cardMat.opacity = modalAmount * 0.96;
        cardEdgeMat.opacity = modalAmount * 0.6;
        floatingGroup.position.z = 0.85 + 0.52 * modalAmount;
        floatingGroup.position.y = -0.52 + 0.22 * modalAmount;
        floatingGroup.rotation.y = (cardSide > 0 ? -0.14 : 0.14) * modalAmount;
        floatingGroup.rotation.x = -0.04 * modalAmount;

        badgeMat.opacity = modalAmount * 0.95;
        badgeMesh.position.z = 0.45 + 0.38 * modalAmount;
        badgeMesh.rotation.y = (cardSide > 0 ? 0.1 : -0.1) * modalAmount;
      }
    },
    dispose() {
      if (videoEl) {
        videoEl.pause();
        videoEl.removeAttribute('src');
        videoEl.load();
      }
      frameMaterial.dispose();
      backingMat.dispose();
      screenTexture.dispose();
      screenMat.dispose();
      chromeTexture.dispose();
      chromeMat.dispose();
      edgeMat.dispose();
      cardTexture.dispose();
      cardMat.dispose();
      cardEdgeMat.dispose();
      badgeTexture.dispose();
      badgeMat.dispose();
    },
  };
}

export interface SpatialSceneController {
  setPlaying(playing: boolean): void;
  setFocusedStation(index: number | null): void;
  setPointerOffset(nx: number, ny: number): void;
  stepToStation(index: number): void;
  dispose(): void;
}

export async function mountSpatialShowcaseScene(
  container: HTMLElement,
  onStationChange?: (station: ShowcaseStation, index: number) => void,
  onReady?: () => void
): Promise<SpatialSceneController> {
  const isSoftwareGl = detectSoftwareWebGL();
  const canvas = document.createElement('canvas');
  canvas.className = 'showcase-webgl-canvas';
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  container.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !isSoftwareGl,
    powerPreference: 'high-performance',
    alpha: false,
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));

  const width = Math.max(1, container.clientWidth || 960);
  const height = Math.max(1, container.clientHeight || 540);
  renderer.setSize(width, height, false);

  const scene = new THREE.Scene();
  // Match the website's signature deep obsidian-emerald background (#090e0c)
  scene.background = new THREE.Color(0x090e0c);
  scene.fog = new THREE.FogExp2(0x090e0c, 0.0068);

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.15, 240);

  // Studio Environment Map (RoomEnvironment) + Warm/Cool Emerald-Lime 3-Point Lighting
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture;
  pmremGenerator.dispose();

  const hemiLight = new THREE.HemisphereLight(0xd9f7be, 0x0c1710, 1.35);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xe4f9c8, 3.6);
  keyLight.position.set(-10, 24, 30);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xc5f58a, 2.8);
  rimLight.position.set(16, -6, 14);
  scene.add(rimLight);

  // Architectural Floor Grid in subtle forest/lime lines
  const grid = new THREE.GridHelper(140, 38, 0x456b3a, 0x18281b);
  grid.position.set(0, -13, -8);
  const gridMat = grid.material as THREE.Material;
  gridMat.transparent = true;
  gridMat.opacity = 0.24;
  scene.add(grid);

  // Connecting route spline across all 8 project stations
  const routePoints = SHOWCASE_STATIONS.map(
    (p) => new THREE.Vector3(p.position[0], p.position[1] - 3.8, p.position[2] - 2.8)
  );
  const routeGeo = new THREE.BufferGeometry().setFromPoints(routePoints);
  const routeMat = new THREE.LineBasicMaterial({
    color: 0xc5f58a,
    transparent: true,
    opacity: 0.18,
  });
  const routeLine = new THREE.Line(routeGeo, routeMat);
  scene.add(routeLine);

  // Seeded atmospheric particles in cyber-lime / sage
  const particleCount = 132;
  const positions = new Float32Array(particleCount * 3);
  let seed = 21707;
  const rand = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (rand() - 0.5) * 82;
    positions[i * 3 + 1] = (rand() - 0.5) * 44;
    positions[i * 3 + 2] = (rand() - 0.5) * 70;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const dotCanvas = document.createElement('canvas');
  dotCanvas.width = 64;
  dotCanvas.height = 64;
  const dotCtx = dotCanvas.getContext('2d')!;
  const dotGrad = dotCtx.createRadialGradient(32, 32, 1, 32, 32, 30);
  dotGrad.addColorStop(0, '#dafbae');
  dotGrad.addColorStop(0.25, 'rgba(197, 245, 138, 0.45)');
  dotGrad.addColorStop(1, 'rgba(9, 14, 12, 0)');
  dotCtx.fillStyle = dotGrad;
  dotCtx.fillRect(0, 0, 64, 64);
  const dotTex = new THREE.CanvasTexture(dotCanvas);
  dotTex.colorSpace = THREE.SRGBColorSpace;
  const particleMat = new THREE.PointsMaterial({
    size: 0.26,
    map: dotTex,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Subtle emerald/lime halo behind each station
  const haloDisposers: (() => void)[] = [];
  SHOWCASE_STATIONS.forEach((p) => {
    const hc = document.createElement('canvas');
    hc.width = 256;
    hc.height = 256;
    const hctx = hc.getContext('2d')!;
    const hg = hctx.createRadialGradient(128, 128, 8, 128, 128, 126);
    hg.addColorStop(0, `${p.color}26`);
    hg.addColorStop(1, `${p.color}00`);
    hctx.fillStyle = hg;
    hctx.fillRect(0, 0, 256, 256);
    const htex = new THREE.CanvasTexture(hc);
    htex.colorSpace = THREE.SRGBColorSpace;
    const hmat = new THREE.MeshBasicMaterial({
      map: htex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const hmesh = new THREE.Mesh(new THREE.PlaneGeometry(23, 17), hmat);
    hmesh.position.set(p.position[0], p.position[1], p.position[2] - 2.4);
    scene.add(hmesh);
    haloDisposers.push(() => {
      htex.dispose();
      hmat.dispose();
    });
  });

  const maxAniso = Math.min(16, renderer.capabilities.getMaxAnisotropy());
  const panels = await Promise.all(
    SHOWCASE_STATIONS.map((st) => createSpatialPanel(st, maxAniso))
  );
  panels.forEach((p) => scene.add(p.group));

  if (!isSoftwareGl) {
    renderer.compile(scene, camera);
  }

  // Pre-allocated math objects for zero-GC animation loop
  const dampedPos = new THREE.Vector3();
  const dampedTarget = new THREE.Vector3();
  const initialTour = sampleTourState(0, null);
  dampedPos.set(...initialTour.position);
  dampedTarget.set(...initialTour.target);

  let elapsed = 0;
  let playing = true;
  let focusedStation: number | null = null;
  let pointerX = 0;
  let pointerY = 0;
  let dampedPointerX = 0;
  let dampedPointerY = 0;
  let currentStationIdx = -1;
  let frameId = 0;
  let disposed = false;
  let lastNow = performance.now();

  const resizeObserver = new ResizeObserver(() => {
    if (disposed) return;
    const w = Math.max(1, container.clientWidth);
    const h = Math.max(1, container.clientHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  });
  resizeObserver.observe(container);

  function afterDraw(cb: () => void) {
    const gl = renderer.getContext() as WebGL2RenderingContext;
    if (!gl || typeof gl.fenceSync !== 'function') {
      frameId = window.setTimeout(cb, 80);
      return;
    }
    const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    gl.flush();
    const poll = () => {
      if (disposed) return;
      const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
      if (state === gl.UNSIGNALED) {
        frameId = window.setTimeout(poll, 5);
      } else {
        if (sync) gl.deleteSync(sync);
        frameId = window.setTimeout(cb, 80);
      }
    };
    frameId = window.setTimeout(poll, 5);
  }

  function renderFrame() {
    if (disposed) return;
    const now = performance.now();
    const dt = Math.min(0.1, Math.max(0.001, (now - lastNow) / 1000));
    lastNow = now;

    if (playing) {
      elapsed += dt;
    }

    const state = sampleTourState(elapsed, focusedStation);
    if (state.stationIndex !== currentStationIdx) {
      currentStationIdx = state.stationIndex;
      onStationChange?.(state.station, state.stationIndex);
    }

    dampedPointerX = THREE.MathUtils.damp(dampedPointerX, pointerX, 5, dt);
    dampedPointerY = THREE.MathUtils.damp(dampedPointerY, pointerY, 5, dt);

    dampedPos.x = THREE.MathUtils.damp(dampedPos.x, state.position[0] + dampedPointerX * 0.45, 6.5, dt);
    dampedPos.y = THREE.MathUtils.damp(dampedPos.y, state.position[1] + dampedPointerY * 0.32, 6.5, dt);
    dampedPos.z = THREE.MathUtils.damp(dampedPos.z, state.position[2], 6.5, dt);

    dampedTarget.x = THREE.MathUtils.damp(dampedTarget.x, state.target[0] + dampedPointerX * 0.15, 7.5, dt);
    dampedTarget.y = THREE.MathUtils.damp(dampedTarget.y, state.target[1] + dampedPointerY * 0.12, 7.5, dt);
    dampedTarget.z = THREE.MathUtils.damp(dampedTarget.z, state.target[2], 7.5, dt);

    camera.fov = THREE.MathUtils.damp(camera.fov, state.fov, 5, dt);
    camera.updateProjectionMatrix();
    camera.position.copy(dampedPos);
    camera.lookAt(dampedTarget);
    camera.rotation.z += state.roll;

    const phase = (elapsed / TOUR_DURATION) * Math.PI * 2;
    particles.position.y = Math.sin(phase) * 0.18;
    particles.position.x = Math.cos(phase) * 0.12;

    for (let i = 0; i < panels.length; i++) {
      panels[i].update(state, focusedStation);
    }

    renderer.render(scene, camera);

    if (playing || focusedStation !== null) {
      if (isSoftwareGl) afterDraw(renderFrame);
      else frameId = requestAnimationFrame(renderFrame);
    }
  }

  // Render initial frame immediately and notify caller
  renderFrame();
  onReady?.();

  return {
    setPlaying(nextPlaying: boolean) {
      if (disposed || playing === nextPlaying) return;
      playing = nextPlaying;
      lastNow = performance.now();
      window.clearTimeout(frameId);
      cancelAnimationFrame(frameId);
      if (playing || focusedStation !== null) {
        renderFrame();
      }
    },
    setFocusedStation(index: number | null) {
      if (disposed) return;
      focusedStation = index;
      if (index !== null) {
        elapsed = index * STATION_DURATION + 1.25;
        const st = SHOWCASE_STATIONS[clamp(index, 0, SHOWCASE_STATIONS.length - 1)];
        currentStationIdx = st.index;
        onStationChange?.(st, st.index);
      }
      lastNow = performance.now();
      window.clearTimeout(frameId);
      cancelAnimationFrame(frameId);
      renderFrame();
    },
    stepToStation(index: number) {
      if (disposed) return;
      const clamped = clamp(index, 0, SHOWCASE_STATIONS.length - 1);
      focusedStation = null;
      elapsed = clamped * STATION_DURATION + 0.45;
      lastNow = performance.now();
      window.clearTimeout(frameId);
      cancelAnimationFrame(frameId);
      renderFrame();
    },
    setPointerOffset(nx: number, ny: number) {
      pointerX = clamp(nx, -1, 1);
      pointerY = clamp(ny, -1, 1);
    },
    dispose() {
      disposed = true;
      window.clearTimeout(frameId);
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      panels.forEach((p) => p.dispose());
      haloDisposers.forEach((fn) => fn());
      routeGeo.dispose();
      routeMat.dispose();
      particleGeo.dispose();
      dotTex.dispose();
      particleMat.dispose();
      envTexture.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
