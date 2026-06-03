import { X } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import { isProjectVideoMedia, type ProjectMedia } from "../../types/content";
import styles from "./MediaLightbox.module.scss";

type MediaLightboxProps = {
  media: ProjectMedia;
  onClose: () => void;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled]):not([tabindex='-1'])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "video[controls]",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function MediaLightbox({ media, onClose }: MediaLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const captionId = useId();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;

      if (!dialog) {
        return;
      }

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (!focusableElements.length) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === firstElement || !dialog.contains(activeElement)) {
          event.preventDefault();
          lastElement?.focus();
        }

        return;
      }

      if (activeElement === lastElement || !dialog.contains(activeElement)) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);

  return (
    <div
      aria-describedby={captionId}
      aria-labelledby={titleId}
      aria-modal="true"
      className={styles.overlay}
      ref={dialogRef}
      role="dialog"
    >
      <button
        aria-label="Close media preview"
        className={styles.backdrop}
        onClick={onClose}
        tabIndex={-1}
        type="button"
      />
      <div className={styles.frame}>
        <h2 className={styles.visuallyHidden} id={titleId}>
          Expanded media preview: {media.caption}
        </h2>
        <button
          aria-label="Close media preview"
          className={styles.close}
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <X aria-hidden="true" />
        </button>
        {isProjectVideoMedia(media) ? (
          <video
            aria-label={media.alt}
            autoPlay
            controls
            loop
            muted
            playsInline
            poster={media.poster}
            preload="metadata"
            src={media.src}
            tabIndex={0}
          />
        ) : (
          <img alt={media.alt} decoding="async" src={media.src} />
        )}
        <p id={captionId}>{media.caption}</p>
      </div>
    </div>
  );
}
