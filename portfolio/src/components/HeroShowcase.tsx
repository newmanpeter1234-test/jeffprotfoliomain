import { useEffect, useId, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { asset, useExperience } from '../hooks/useExperience';
import edit from '../data/liquid-glass.json';
import type { ShowcaseStation, SpatialSceneController } from './SpatialShowcaseEngine';
import '../hero-showcase.css';
import '../showreel.css';
import '../liquid-glass.css';

export type ShowcaseCollection = {
  video: string;
  poster: string;
  mobilePoster: string;
  duration: number;
  width: number;
  height: number;
  fps: number;
  description: string;
};
export const portfolioShowcase: ShowcaseCollection = edit;

const INITIAL_STATIONS_META = [
  { id: 'astra', index: 0, short: 'ASTRA', title: 'ASTRA Monitor', slug: 'astra-monitor', category: 'SOC SIMULATION', feature: 'From alert to context.' },
  { id: 'soc', index: 1, short: 'SOC AI', title: 'SOC Threat Detection Assistant', slug: 'soc-threat-detection-assistant', category: 'AI-ASSISTED INVESTIGATION', feature: 'Structure the investigation.' },
  { id: 'splunk', index: 2, short: 'SPLUNK', title: 'Splunk SOC Lab', slug: 'splunk-soc-lab', category: 'LOG ANALYSIS', feature: 'Make the logs tell a story.' },
  { id: 'url', index: 3, short: 'PHISH', title: 'URL Phishing Detector', slug: 'url-phishing-detector', category: 'LINK ANALYSIS', feature: 'Inspect before you trust.' },
  { id: 'wazuh', index: 4, short: 'WAZUH', title: 'Wazuh SIEM Lab', slug: 'wazuh-siem-lab', category: 'ENDPOINT INVESTIGATION', feature: 'Follow the endpoint evidence.' },
  { id: 'scanner', index: 5, short: 'SCAN', title: 'Web Vulnerability Scanner', slug: 'web-vulnerability-scanner', category: 'AUTHORISED ASSESSMENT', feature: 'Define the scope first.' },
  { id: 'passchecker', index: 6, short: 'PASS', title: 'PassChecker', slug: 'passchecker', category: 'PASSWORD HYGIENE', feature: 'Better habits. Local feedback.' },
  { id: 'wireshark', index: 7, short: 'PCAP', title: 'Wireshark Traffic Analysis', slug: 'wireshark-traffic-analysis', category: 'PACKET ANALYSIS', feature: 'Go beneath the surface.' },
];

export function HeroShowcase({ collection = portfolioShowcase }: { collection?: ShowcaseCollection }) {
  const { motion } = useExperience();
  const navigate = useNavigate();
  const descriptionId = useId();
  const root = useRef<HTMLElement>(null);
  const webglMountRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpatialSceneController | null>(null);
  const holdTimerRef = useRef<number>(0);

  // Start visible and running automatically as soon as the website opens
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [webglReady, setWebglReady] = useState(false);
  const [activeStationIdx, setActiveStationIdx] = useState(0);
  const [focusedStationIdx, setFocusedStationIdx] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  const offline = Boolean(window.__OFFLINE_PREVIEW__);
  const permitted = !offline && !failed && motion;
  const shouldPlay = permitted && visible && pageVisible && !paused;

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(node);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  // Automatically mount and play the 3D Live WebGL scene when the website opens
  useEffect(() => {
    if (!permitted || offline || failed) {
      if (controllerRef.current) {
        controllerRef.current.dispose();
        controllerRef.current = null;
      }
      setWebglReady(false);
      setPlaying(false);
      return;
    }

    let cancelled = false;
    if (!controllerRef.current && webglMountRef.current) {
      import('./SpatialShowcaseEngine')
        .then(({ mountSpatialShowcaseScene }) => {
          if (cancelled || !webglMountRef.current) return;
          return mountSpatialShowcaseScene(
            webglMountRef.current,
            (_station: ShowcaseStation, idx: number) => {
              if (!cancelled) setActiveStationIdx(idx);
            },
            () => {
              if (!cancelled) {
                setWebglReady(true);
                setPlaying(shouldPlay);
              }
            }
          );
        })
        .then((ctrl) => {
          if (cancelled) {
            ctrl?.dispose();
            return;
          }
          if (ctrl) {
            controllerRef.current = ctrl;
            ctrl.setPlaying(shouldPlay);
            setPlaying(shouldPlay);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setFailed(true);
            setWebglReady(false);
            setPlaying(false);
          }
        });
    } else if (controllerRef.current) {
      controllerRef.current.setPlaying(shouldPlay);
      setPlaying(shouldPlay);
    }

    return () => {
      cancelled = true;
    };
  }, [shouldPlay, permitted, offline, failed]);

  useEffect(() => {
    return () => {
      window.clearTimeout(holdTimerRef.current);
      if (controllerRef.current) {
        controllerRef.current.dispose();
        controllerRef.current = null;
      }
    };
  }, []);

  function toggle() {
    if (offline) return;
    if (playing) {
      setPaused(true);
      setPlaying(false);
      controllerRef.current?.setPlaying(false);
      return;
    }
    setPaused(false);
    setFailed(false);
    controllerRef.current?.setPlaying(true);
    setPlaying(true);
  }

  function handleSelectStation(idx: number) {
    window.clearTimeout(holdTimerRef.current);
    setPaused(false);
    setPlaying(true);
    setActiveStationIdx(idx);
    setFocusedStationIdx(idx);
    controllerRef.current?.setFocusedStation(idx);

    // Hold on the clicked station for 4 seconds, then automatically continue running the tour
    holdTimerRef.current = window.setTimeout(() => {
      setFocusedStationIdx(null);
    }, 4000);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!controllerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1);
    controllerRef.current.setPointerOffset(nx, ny);
  }

  function handlePointerLeave() {
    controllerRef.current?.setPointerOffset(0, 0);
  }

  const currentMeta = INITIAL_STATIONS_META[activeStationIdx] || INITIAL_STATIONS_META[0];
  const showWebglLayer = webglReady && !failed && permitted;

  return (
    <figure
      ref={root}
      className="hero-showcase hero-showcase--glass"
      aria-label="Cinematic cybersecurity project preview"
      aria-describedby={descriptionId}
      data-state={failed ? 'fallback' : playing ? 'playing' : webglReady ? 'paused' : 'poster'}
      data-render-mode="webgl"
    >
      <div className="showcase-window">
        <div
          className="showcase-stage"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {!posterFailed ? (
            <picture className="showcase-poster">
              <source media="(max-width:760px)" srcSet={asset(collection.mobilePoster)} />
              <img
                src={asset(collection.poster)}
                width={collection.width}
                height={collection.height}
                alt="Original cybersecurity dashboards with a restrained frosted-glass treatment"
                fetchPriority="high"
                decoding="async"
                onError={() => setPosterFailed(true)}
              />
            </picture>
          ) : (
            <div className="showcase-image-fallback" aria-hidden="true" />
          )}

          {/* Dedicated mount container for live Three.js 3D WebGL scene */}
          <div
            ref={webglMountRef}
            className={showWebglLayer ? 'showcase-webgl-mount is-active' : 'showcase-webgl-mount'}
            aria-hidden="true"
          />

          {/* Top-left subtle HUD header when 3D WebGL is active (no buttons on top-right) */}
          {showWebglLayer && (
            <div className="showcase-hud-top" aria-hidden="true">
              <div className="showcase-hud-status">
                <span className="showcase-hud-index">0{currentMeta.index + 1} / 08</span>
                <span className="showcase-hud-divider">·</span>
                <span className="showcase-hud-category">{currentMeta.category}</span>
                <span className="showcase-hud-divider">·</span>
                <span className="showcase-hud-title">{currentMeta.title}</span>
              </div>
            </div>
          )}

          {!offline && (
            <button
              type="button"
              className="showcase-playback glass-playback"
              onClick={toggle}
              aria-label={playing ? 'Pause project preview' : 'Play project preview'}
              title={playing ? 'Pause' : 'Play'}
            >
              {playing ? <Pause size={12} /> : <Play size={12} />}
            </button>
          )}
        </div>
      </div>

      {/* External horizontal station & Inspect bar positioned directly outside/below the showcase window */}
      {!offline && (
        <div className="showcase-station-dock showcase-station-dock--external" aria-hidden="true">
          <div className="showcase-station-pills">
            {INITIAL_STATIONS_META.map((st) => {
              const isCurrent = st.index === activeStationIdx;
              const isPinned = st.index === focusedStationIdx;
              return (
                <span
                  key={st.id}
                  role="presentation"
                  className={`showcase-station-pill${isCurrent ? ' is-current' : ''}${isPinned ? ' is-pinned' : ''}`}
                  onClick={() => handleSelectStation(st.index)}
                  title={`${st.title} — ${st.feature}`}
                >
                  <span className="pill-idx">0{st.index + 1}</span>
                  <span className="pill-name">{st.short}</span>
                </span>
              );
            })}
          </div>
          <span
            role="presentation"
            className="showcase-station-open"
            onClick={() => navigate(`/projects/${currentMeta.slug}`)}
            title={`Open ${currentMeta.title} case study`}
          >
            <span>INSPECT</span>
            <ArrowUpRight size={11} />
          </span>
        </div>
      )}

      <figcaption id={descriptionId} className="sr-only">
        {collection.description}
      </figcaption>
      {failed && (
        <span className="sr-only" role="status">
          3D preview unavailable. Static preview shown. Use the play control to retry.
        </span>
      )}
    </figure>
  );
}
