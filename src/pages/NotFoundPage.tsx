import { Link } from "react-router-dom";
import { StageRoom } from "../features/stage/StageRoom";
import { notFoundMetadata } from "../content/routeMetadata";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import styles from "./Article.module.scss";

export function NotFoundPage() {
  useDocumentMeta(notFoundMetadata);

  return (
    <>
      <StageRoom floor={false} />
      <main className={styles.page} id="main">
        <div className={styles.notFound}>
          <h1>Off the stage.</h1>
          <p>That page doesn&apos;t exist — the link may have changed.</p>
          <Link to="/">← Back to the start</Link>
        </div>
      </main>
    </>
  );
}
