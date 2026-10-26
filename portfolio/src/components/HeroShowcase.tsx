import { useEffect, useId, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Box, Film, Pause, Play, RotateCcw } from 'lucide-react';
import { asset, useExperience } from '../hooks/useExperience';
import edit from '../data/liquid-glass.json';
import type { ShowcaseStation, SpatialSceneController } from './SpatialShowcaseEngine';
import '../hero-showcase.css';
import '../showreel.css';
import '../liquid-glass.css';

type Connection = EventTarget & { saveData?: boolean; effectiveType?: string; downlink?: number };
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

function policy() {
  const connection = (navigator as Navigator & { connection?: Connection }).connection;
  return {
    reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
    limited: Boolean(
      connection?.saveData ||
        /^(slow-2g|2g|3g)$/.test(connection?.effectiveType || '') ||
        (typeof connection?.downlink === 'number' && connection.downlink < 1.2)
    ),
  };
}

export function HeroShowcase({ collection = portfolioShowcase }: { collection?: ShowcaseCollection }) {
  const { motion } = useExperience();
  const navigate = useNavigate();
  const descriptionId = useId();
  const root = useRef<HTMLElement>(null);
  const webglMountRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpatialSceneController | null>(null);
  const video = useRef<HTMLVideoElement>(null);

  const [preferences, setPreferences] = useState(policy);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [paused, setPaused] = useState(false);
  const [manual, setManual] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [webglReady, setWebglReady] = useState(false);
  const [renderMode, setRenderMode] = useState<'webgl' | 'video'>('webgl');
  const [activeStationIdx, setActiveStationIdx] = useState(0);
  const [focusedStationIdx, setFocusedStationIdx] = useState<number | null>(null);
  const [blocked, setBlocked] = useState(false);
  const [failed, setFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  const offline = Boolean(window.__OFFLINE_PREVIEW__);
  const automatic = motion && !preferences.reduced && !preferences.limited;
  const permitted = !offline && !failed && (manual || automatic);
  const shouldPlay = permitted && visible && pageVisible && !paused && (!blocked || manual);

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const update = () => {
      setPreferences(policy());
      setManual(false);
    };
    reduce.addEventListener('change', update);
    connection?.addEventListener('change', update);
    return () => {
      reduce.removeEventListener('change', update);
      connection?.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!motion) setManual(false);
  }, [motion]);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.12),
      { threshold: [0, 0.12] }
    );
    observer.observe(node);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  // Synchronize the MP4 video element
  useEffect(() => {
    const media = video.current;
    if (!media) return;
    let cancelled = false;
    if (shouldPlay) {
      const timer = window.setTimeout(
        () => {
          if (cancelled) return;
          if (!media.getAttribute('src')) media.src = asset(collection.video);
          media.play()?.catch(() => {
            if (!cancelled && media.getAttribute('src')) {
              setBlocked(true);
              setPlaying(false);
              setReady(false);
            }
          });
        },
        manual ? 0 : 250
      );
      return () => {
        cancelled = true;
        window.clearTimeout(timer);
        media.pause();
      };
    }
    media.pause();
    setPlaying(false);
    if (!permitted && media.getAttribute('src')) {
      media.removeAttribute('src');
      media.load();
      setReady(false);
    }
    return () => {
      cancelled = true;
    };
  }, [shouldPlay, permitted, manual, collection.video]);

  // Mount the live Three.js 3D Spatial Showcase once playback starts (and dispose when !permitted)
  useEffect(() => {
    if (!permitted || offline || failed) {
      if (controllerRef.current) {
        controllerRef.current.dispose();
        controllerRef.current = null;
      }
      setWebglReady(false);
      return;
    }

    if (!playing && !controllerRef.current) return;

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
              if (!cancelled) setWebglReady(true);
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
            ctrl.setPlaying(playing && renderMode === 'webgl');
          }
        })
        .catch(() => {
          if (!cancelled) setWebglReady(false);
        });
    } else if (controllerRef.current) {
      controllerRef.current.setPlaying(playing && renderMode === 'webgl');
    }

    return () => {
      cancelled = true;
    };
  }, [playing, permitted, offline, failed, renderMode]);

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.dispose();
        controllerRef.current = null;
      }
    };
  }, []);

  function toggle() {
    const media = video.current;
    if (!media || offline) return;
    if (playing) {
      setPaused(true);
      setPlaying(false);
      media.pause();
      controllerRef.current?.setPlaying(false);
      return;
    }
    setPaused(false);
    setManual(true);
    setBlocked(false);
    setFailed(false);
    if (failed || !media.getAttribute('src')) {
      media.src = asset(collection.video);
      if (failed) media.load();
    }
    controllerRef.current?.setPlaying(true);
    media.play()?.catch((error) => {
      if (error?.name === 'AbortError') return;
      if (media.getAttribute('src')) {
        setBlocked(true);
        setManual(false);
        setReady(false);
      }
    });
  }

  function handleSelectStation(idx: number) {
    if (!controllerRef.current) return;
    if (focusedStationIdx === idx) {
      setFocusedStationIdx(null);
      controllerRef.current.setFocusedStation(null);
    } else {
      setFocusedStationIdx(idx);
      setActiveStationIdx(idx);
      controllerRef.current.setFocusedStation(idx);
    }
  }

  function handleResumeAutoTour() {
    setFocusedStationIdx(null);
    controllerRef.current?.setFocusedStation(null);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!controllerRef.current || renderMode !== 'webgl') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1);
    controllerRef.current.setPointerOffset(nx, ny);
  }

  function handlePointerLeave() {
    controllerRef.current?.setPointerOffset(0, 0);
  }

  const currentMeta = INITIAL_STATIONS_META[activeStationIdx] || INITIAL_STATIONS_META[0];
  const showWebglLayer = webglReady && renderMode === 'webgl' && !failed && permitted;

  return (
    <figure
      ref={root}
      className="hero-showcase hero-showcase--glass"
      aria-label="Cinematic cybersecurity project preview"
      aria-describedby={descriptionId}
      data-state={failed ? 'fallback' : playing ? 'playing' : ready ? 'paused' : 'poster'}
      data-render-mode={showWebglLayer ? 'webgl' : 'video'}
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

          <video
            ref={video}
            className={ready ? 'showcase-video is-ready' : 'showcase-video'}
            width={collection.width}
            height={collection.height}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            disablePictureInPicture
            onPlaying={(event) => {
              if (!shouldPlay || !event.currentTarget.getAttribute('src')) {
                event.currentTarget.pause();
                return;
              }
              setPlaying(true);
              setReady(true);
            }}
            onPause={() => setPlaying(false)}
            onError={() => {
              if (video.current?.getAttribute('src')) {
                setFailed(true);
                setReady(false);
                setPlaying(false);
              }
            }}
          />

          {/* Dedicated mount container for live Three.js 3D WebGL scene */}
          <div
            ref={webglMountRef}
            className={showWebglLayer ? 'showcase-webgl-mount is-active' : 'showcase-webgl-mount'}
            aria-hidden="true"
          />

          {/* Top-left subtle HUD header when 3D WebGL or video is active */}
          {ready && !failed && permitted && (
            <div className="showcase-hud-top" aria-hidden="true">
              <div className="showcase-hud-status">
                <span className="showcase-hud-index">0{currentMeta.index + 1} / 08</span>
                <span className="showcase-hud-divider">·</span>
                <span className="showcase-hud-category">{currentMeta.category}</span>
                <span className="showcase-hud-divider">·</span>
                <span className="showcase-hud-title">{currentMeta.title}</span>
              </div>
              <div className="showcase-hud-actions">
                {focusedStationIdx !== null && showWebglLayer && (
                  <span
                    role="presentation"
                    className="showcase-hud-chip is-highlight"
                    onClick={handleResumeAutoTour}
                  >
                    <RotateCcw size={10} />
                    <span>AUTO TOUR</span>
                  </span>
                )}
                {webglReady && (
                  <span
                    role="presentation"
                    className="showcase-hud-chip"
                    onClick={() => setRenderMode((m) => (m === 'webgl' ? 'video' : 'webgl'))}
                    title="Switch between Live 3D WebGL and MP4 video"
                  >
                    {renderMode === 'webgl' ? <Box size={10} /> : <Film size={10} />}
                    <span>{renderMode === 'webgl' ? '3D LIVE' : 'MP4 FILM'}</span>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Bottom interactive station dock when 3D WebGL is active */}
          {showWebglLayer && (
            <div className="showcase-station-dock" aria-hidden="true">
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
      <figcaption id={descriptionId} className="sr-only">
        {collection.description}
      </figcaption>
      {failed && (
        <span className="sr-only" role="status">
          Video unavailable. Static preview shown. Use the play control to retry.
        </span>
      )}
    </figure>
  );
}
