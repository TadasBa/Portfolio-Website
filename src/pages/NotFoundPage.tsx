import { Compass } from "lucide-react";
import { SectionContainer } from "../components/layout/SectionContainer";
import { EmptyState } from "../components/ui/EmptyState";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import styles from "./NotFoundPage.module.scss";

export function NotFoundPage() {
  useDocumentMeta({
    title: "Page not found",
    description: "The requested page could not be found.",
  });

  return (
    <SectionContainer className={styles.page}>
      <EmptyState
        actionLabel="Back home"
        actionTo="/"
        description="The route may have changed, or the link may no longer be valid."
        icon={<Compass />}
        title="Page not found"
      />
    </SectionContainer>
  );
}
