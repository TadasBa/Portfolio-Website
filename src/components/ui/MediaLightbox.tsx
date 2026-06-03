import { X } from "lucide-react";
import { useEffect } from "react";
import { isProjectVideoMedia, type ProjectMedia } from "../../types/content";
import styles from "./MediaLightbox.module.scss";

type MediaLightboxProps = {
  media: ProjectMedia;
  onClose: () => void;
};

export function MediaLightbox({ media, onClose }: MediaLightboxProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      aria-label="Expanded media preview"
      aria-modal="true"
      className={styles.overlay}
      role="dialog"
    >
      <button
        aria-label="Close image preview"
        className={styles.backdrop}
        onClick={onClose}
        type="button"
      />
      <div className={styles.frame}>
        <button
          aria-label="Close image preview"
          className={styles.close}
          onClick={onClose}
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
          />
        ) : (
          <img alt={media.alt} decoding="async" src={media.src} />
        )}
        <p>{media.caption}</p>
      </div>
    </div>
  );
}
