import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ProjectMarkdownContentProps = {
  className?: string;
  content: string;
};

export function ProjectMarkdownContent({
  className,
  content,
}: ProjectMarkdownContentProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          table({ children }) {
            return (
              <div className="projectMarkdownTableFrame">
                <table>{children}</table>
              </div>
            );
          },
        }}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
