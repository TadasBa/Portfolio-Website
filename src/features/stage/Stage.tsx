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

export function Stage({ panels }: { panels: StagePanel[] }) {
  const [fallback, setFallback] = useState(detectFallback);
  const [active, setActive] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const innerRefs = useRef(new Map<number, HTMLDivElement>());
  const goToRef = useRef<(index: number) => void>(() => {});
  const total = panels.length;

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
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let target = 0;
    let pos = 0;
    let lastIdx = -1;
    let raf = 0;
    let snapTimer = 0;
    let drag: { x: number; t: number } | null = null;
    let dir = 0;
    // living frame state
    let fw = 480;
    let fh = 360;
    let tw = 480;
    let th = 360;

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
      tw = Math.min(el.offsetWidth + 92, vw - 56);
      th = Math.min(el.offsetHeight + 96, vh - 120);
    }
    measure(0);
    fw = tw;
    fh = th;

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
      sizeCanvas();
      target = Math.round(target / vw) * vw;
      measure(Math.round(pos / vw));
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

    // clean rounded frame that resizes to the focused panel, gently breathing
    function drawFrame(time: number) {
      const t = time / 1000;
      fw += (tw - fw) * 0.12;
      fh += (th - fh) * 0.12;
      g.clearRect(0, 0, vw, vh);
      const cx = vw / 2 + Math.sin(t * 0.6) * 2.5;
      const cy = vh / 2 + Math.cos(t * 0.47) * 2.5;
      const w = fw;
      const h = fh;
      const rad = 22 + Math.sin(t * 0.8) * 2.5;

      g.save();
      g.translate(cx, cy);
      g.beginPath();
      g.roundRect(-w / 2, -h / 2, w, h, rad);
      g.fillStyle = "rgba(255, 255, 255, 0.22)";
      g.fill();
      g.lineWidth = 1.4;
      g.strokeStyle = accent;
      g.shadowColor = "rgba(18, 21, 27, 0.09)";
      g.shadowBlur = 38;
      g.shadowOffsetY = 20;
      g.stroke();
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
  }, [fallback, total]);

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
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.panelIndex));
          }
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
