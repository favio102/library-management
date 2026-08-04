import { EmptyStateProps } from "@/types";

/* Three beats: name what's empty, say why it matters, offer the one next
 * action. Used for the empty shelf, a search that misses, and a failed load —
 * which the previous build collapsed into one unstyled "No Books Found." */
const EmptyState = ({ title, body, mark, action }: EmptyStateProps) => (
  <div className="state">
    {mark && (
      <span className="state__mark" aria-hidden="true">
        {mark}
      </span>
    )}
    <h2 className="state__title">{title}</h2>
    <p className="state__body">{body}</p>
    {action && <div className="state__action">{action}</div>}
  </div>
);

export default EmptyState;
