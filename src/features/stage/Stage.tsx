import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { StageRoom } from "./StageRoom";
import styles from "./Stage.module.scss";

export type StagePanel = {
  id: string;
  label: string;
  content: ReactNode;
};

function detectFallback() {
  if (typeof window === "undefined") {
    return false;
  }
  const reduce =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return reduce || window.innerWidth <= 820;
}

export function Stage({
  panels,
  initialPanelId,
  onPanelChange,
}: {
  panels: StagePanel[];
  initialPanelId?: string;
  onPanelChange?: (panelId: string) => void;
}) {
  const initialIndex = Math.max(
    0,
    panels.findIndex((panel) => panel.id === initialPanelId),
  );
  const [fallback, setFallback] = useState(detectFallback);
  const [active, setActive] = useState(initialIndex);

  const trackRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const innerRefs = useRef(new Map<number, HTMLDivElement>());
  const goToRef = useRef<(index: number) => void>(() => {});
  // while a programmatic scroll is in flight, observer updates are stale —
  // ignore them so the explicitly chosen panel wins (timestamp in ms)
  const scrollLockRef = useRef(0);
  // the breathing exercise starts when the page opens and resets on reload;
  // keep the start time across effect re-runs (resize, mode flips)
  const breathStartRef = useRef(-1);
  const total = panels.length;

  // let the page react when a different panel takes focus (e.g. URL sync)
  useEffect(() => {
    const panel = panels[active];
    if (panel) {
      onPanelChange?.(panel.id);
    }
  }, [active, onPanelChange, panels]);

  useEffect(() => {
    const update = () => setFallback(detectFallback());
    window.addEventListener("resize", update);
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    mql?.addEventListener?.("change", update);
    return () => {
      window.removeEventListener("resize", update);
      mql?.removeEventListener?.("change", update);
    };
  }, []);

  // desktop: horizontal glide + magnetic snap + living frame
  useEffect(() => {
    if (fallback) {
      return;
    }
    const track = trackRef.current;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!track || !wrap || !canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    const cnv = canvas;
    const g = ctx;

    const cs = getComputedStyle(document.documentElement);
    const accent = cs.getPropertyValue("--accent").trim() || "#3a4e73";
    const spark = cs.getPropertyValue("--spark").trim() || "#d7623f";
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    // slow-breathing pace: 5.5s inhale + 5.5s exhale, 27 breaths ≈ 5 minutes
    const BREATH_PERIOD = 11000;
    const BREATH_TOTAL = 27;

    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let target = initialIndex * vw;
    let pos = target;
    let lastIdx = -1;
    let raf = 0;
    let snapTimer = 0;
    let drag: { x: number; t: number } | null = null;
    let dir = 0;
    // living frame state: fw/fh chase the measured panel, sw/sh smooth the
    // final breathing size so mode changes never pop
    let fw = 480;
    let fh = 360;
    let tw = 480;
    let th = 360;
    let sw = 480;
    let sh = 360;

    function sizeCanvas() {
      vw = window.innerWidth;
      vh = window.innerHeight;
      cnv.width = vw * dpr;
      cnv.height = vh * dpr;
      cnv.style.width = `${vw}px`;
      cnv.style.height = `${vh}px`;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    sizeCanvas();

    function measure(idx: number) {
      const el = innerRefs.current.get(idx);
      if (!el) {
        return;
      }
      // keep the frame's bottom edge clear of the floor, breathing included
      const floorH = floorRef.current?.offsetHeight ?? 0;
      tw = Math.min(el.offsetWidth + 92, vw - 56);
      th = Math.min(el.offsetHeight + 96, vh - 120, vh - 2 * (floorH + 24));
    }
    measure(initialIndex);
    fw = tw;
    fh = th;
    sw = tw;
    sh = th;

    const clamp = () => {
      target = Math.max(0, Math.min((total - 1) * vw, target));
    };
    goToRef.current = (index) => {
      target = index * vw;
      clamp();
    };

    // gentle, direction-aware snap so a modest scroll commits to the next panel
    const scheduleSnap = () => {
      window.clearTimeout(snapTimer);
      snapTimer = window.setTimeout(() => {
        const base = target / vw;
        const idx = Math.floor(base);
        const frac = base - idx;
        let next;
        if (dir > 0) {
          next = frac > 0.26 ? idx + 1 : idx;
        } else if (dir < 0) {
          next = frac < 0.74 ? idx : idx + 1;
        } else {
          next = Math.round(base);
        }
        target = Math.max(0, Math.min(total - 1, next)) * vw;
      }, 240);
    };
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta =
        Math.abs(event.deltaY) > Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;
      if (delta !== 0) {
        dir = Math.sign(delta);
      }
      target += delta;
      clamp();
      scheduleSnap();
    };
    const onKey = (event: KeyboardEvent) => {
      const idx = Math.round(target / vw);
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        target = Math.min(total - 1, idx + 1) * vw;
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        target = Math.max(0, idx - 1) * vw;
      } else if (event.key === "Home") {
        target = 0;
      } else if (event.key === "End") {
        target = (total - 1) * vw;
      }
    };
    const onResize = () => {
      // hold on to the panel index — pixel offsets mean nothing after resize
      const idx = Math.max(0, Math.min(total - 1, Math.round(target / vw)));
      sizeCanvas();
      target = idx * vw;
      pos = idx * vw;
      measure(idx);
    };
    const onPointerDown = (event: PointerEvent) => {
      if ((event.target as HTMLElement)?.closest("a, button")) {
        return;
      }
      drag = { x: event.clientX, t: target };
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!drag) {
        return;
      }
      target = drag.t - (event.clientX - drag.x) * 1.4;
      clamp();
    };
    const onPointerUp = () => {
      if (drag) {
        target = Math.round(target / vw) * vw;
        drag = null;
      }
    };
    const onFocusIn = (event: FocusEvent) => {
      const panelEl = (event.target as HTMLElement)?.closest<HTMLElement>(
        "[data-panel-index]",
      );
      if (panelEl?.dataset.panelIndex) {
        target = Number(panelEl.dataset.panelIndex) * vw;
        clamp();
      }
    };

    // clean rounded frame that resizes to the focused panel and breathes at
    // the slow-breathing rhythm — 5.5s in, 5.5s out — from the moment the
    // page opens. The border is 27 dashes, one per breath; each completed
    // breath lights one up, so five quiet minutes fill the whole frame.
    function drawFrame(time: number) {
      if (breathStartRef.current < 0) {
        breathStartRef.current = time;
      }
      const elapsed = time - breathStartRef.current;
      fw += (tw - fw) * 0.16;
      fh += (th - fh) * 0.16;
      g.clearRect(0, 0, vw, vh);

      const phase = (elapsed % BREATH_PERIOD) / BREATH_PERIOD;
      const inhale = 0.5 - 0.5 * Math.cos(phase * Math.PI * 2);
      const wave = inhale * 2 - 1;
      const done = Math.min(BREATH_TOTAL, Math.floor(elapsed / BREATH_PERIOD));
      const finished = done >= BREATH_TOTAL;

      // ease in on arrival; once all 27 are done, settle into a murmur
      const rampIn = Math.min(1, elapsed / 2200);
      const settle = finished
        ? Math.min(1, (elapsed - BREATH_TOTAL * BREATH_PERIOD) / 4000)
        : 0;
      const depth = rampIn * (1 - 0.7 * settle);

      const amp = 0.006 + 0.016 * depth;
      sw += (fw * (1 + amp * wave) - sw) * 0.1;
      sh += (fh * (1 + amp * wave) - sh) * 0.1;

      const radius = 22;
      const perimeter =
        2 * (sw - 2 * radius) + 2 * (sh - 2 * radius) + 2 * Math.PI * radius;
      const unit = perimeter / BREATH_TOTAL;
      const gapLen = Math.min(12, unit * 0.16);
      const dashLen = unit - gapLen;
      // first dash sits centered on the top edge, progressing clockwise
      const dashOffset = -(sw / 2 - radius) + dashLen / 2;

      g.save();
      g.translate(vw / 2, vh / 2);
      g.beginPath();
      g.roundRect(-sw / 2, -sh / 2, sw, sh, radius);
      g.fillStyle = "rgba(255, 255, 255, 0.22)";
      g.fill();

      // soft continuous halo behind the dashes, brightening on the inhale
      g.strokeStyle = accent;
      g.globalAlpha = Math.max(0.02, 0.1 + (0.04 + 0.08 * depth) * wave);
      g.lineWidth = 5;
      g.stroke();

      // the border itself: 27 dashes, one per breath
      g.globalAlpha = 1;
      g.lineWidth = 1.5;
      g.lineDashOffset = dashOffset;
      g.setLineDash([dashLen, gapLen]);
      g.stroke();

      // completed breaths stay lit
      if (done > 0) {
        const lit: number[] = [];
        for (let i = 0; i < done; i += 1) {
          lit.push(dashLen, gapLen);
        }
        lit[lit.length - 1] = perimeter - done * unit + gapLen;
        g.strokeStyle = spark;
        g.globalAlpha = 0.85;
        g.setLineDash(lit);
        g.stroke();
      }

      // the breath in progress glows in gradually
      if (!finished) {
        g.strokeStyle = spark;
        g.globalAlpha = 0.85 * phase * rampIn;
        g.setLineDash([
          0,
          done * unit,
          dashLen,
          perimeter - done * unit - dashLen,
        ]);
        g.stroke();
      }

      g.setLineDash([]);
      g.globalAlpha = 1;
      g.restore();
    }

    const loop = (time: number) => {
      pos += (target - pos) * 0.09;
      track.style.transform = `translateX(${-pos}px)`;
      floorRef.current?.style.setProperty("--shift", `${-pos * 0.4}px`);
      const idx = Math.round(pos / vw);
      if (idx !== lastIdx) {
        lastIdx = idx;
        setActive(idx);
        measure(idx);
      }
      drawFrame(time);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    wrap.addEventListener("focusin", onFocusIn);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(snapTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      wrap.removeEventListener("focusin", onFocusIn);
    };
  }, [fallback, total, initialIndex]);

  // fallback: land on the requested section on mount
  useEffect(() => {
    if (!fallback || !initialPanelId) {
      return;
    }
    scrollLockRef.current = Date.now() + 900;
    document
      .getElementById(`panel-${initialPanelId}`)
      ?.scrollIntoView({ block: "start" });
  }, [fallback, initialPanelId]);

  // fallback: track active section for nav highlight
  useEffect(() => {
    if (!fallback) {
      return;
    }
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-panel-index]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < scrollLockRef.current) {
          return;
        }
        // several short panels can intersect at once — the most visible wins
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            (!best || entry.intersectionRatio > best.intersectionRatio)
          ) {
            best = entry;
          }
        }
        if (best) {
          setActive(Number((best.target as HTMLElement).dataset.panelIndex));
        }
      },
      { threshold: 0.5 },
    );
    for (const section of sections) {
      observer.observe(section);
    }
    return () => observer.disconnect();
  }, [fallback]);

  const navigate = useCallback(
    (index: number) => {
      if (fallback) {
        scrollLockRef.current = Date.now() + 900;
        document
          .getElementById(`panel-${panels[index].id}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        goToRef.current(index);
      }
      setActive(index);
    },
    [fallback, panels],
  );

  const nav = (
    <nav aria-label="Sections" className={styles.nav}>
      {panels.map((panel, index) => (
        <button
          aria-current={index === active}
          className={styles.navBtn}
          key={panel.id}
          onClick={() => navigate(index)}
          type="button"
        >
          {panel.label}
        </button>
      ))}
    </nav>
  );

  const setInnerRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) {
      innerRefs.current.set(index, el);
    } else {
      innerRefs.current.delete(index);
    }
  };

  if (fallback) {
    return (
      <>
        <StageRoom />
        <header className={styles.top}>{nav}</header>
        <main className={styles.vertical} id="main">
          {panels.map((panel, index) => (
            <section
              aria-label={panel.label}
              className={styles.vpanel}
              data-panel-index={index}
              id={`panel-${panel.id}`}
              key={panel.id}
            >
              <div className={styles.inner} ref={setInnerRef(index)}>
                {panel.content}
              </div>
            </section>
          ))}
        </main>
      </>
    );
  }

  return (
    <>
      <StageRoom floorRef={floorRef} />
      <canvas
        aria-hidden="true"
        className={styles.frameCanvas}
        ref={canvasRef}
      />
      <header className={styles.top}>{nav}</header>
      <div className={styles.wrap} ref={wrapRef}>
        <div className={styles.track} ref={trackRef}>
          <main id="main" style={{ display: "contents" }}>
            {panels.map((panel, index) => (
              <section
                aria-label={panel.label}
                className={styles.panel}
                data-panel-index={index}
                id={`panel-${panel.id}`}
                key={panel.id}
              >
                <div className={styles.inner} ref={setInnerRef(index)}>
                  {panel.content}
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
      <div className={styles.prog}>
        <div className={styles.progBar}>
          <span
            className={styles.progFill}
            style={{
              left: `${(active / total) * 100}%`,
              width: `${100 / total}%`,
            }}
          />
        </div>
      </div>
    </>
  );
}
