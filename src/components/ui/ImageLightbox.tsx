import { X } from "lucide-react";
import { useEffect } from "react";
import styles from "./ImageLightbox.module.scss";

type ImageLightboxProps = {
  alt: string;
  caption?: string;
  onClose: () => void;
  src: string;
};

export function ImageLightbox({
  alt,
  caption,
  onClose,
  src,
}: ImageLightboxProps) {
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
      aria-label="Expanded image preview"
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
        <img alt={alt} src={src} />
        {caption ? <p>{caption}</p> : null}
      </div>
    </div>
  );
}
