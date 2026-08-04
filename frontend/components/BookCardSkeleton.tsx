/* Geometry matches BookCard exactly — same aspect ratio, same gaps, same line
 * positions — so the grid does not jump when the catalogue arrives. */
const BookCardSkeleton = () => (
  <div className="skel" aria-hidden="true">
    <div className="skel__board" />
    <div className="grid gap-2xs">
      <div className="skel__line" style={{ width: "88%" }} />
      <div className="skel__line" style={{ width: "56%" }} />
    </div>
    <div className="skel__line" style={{ width: "40%", height: "0.625rem" }} />
  </div>
);

export default BookCardSkeleton;
