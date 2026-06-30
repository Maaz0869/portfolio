// Cursor-following spotlight glow on a card.
// Add a `.card-spot` child div inside the card; these handlers move/clear it.
export const spotMove = (e) => {
  const spot = e.currentTarget.querySelector(".card-spot");
  if (!spot) return;
  const r = e.currentTarget.getBoundingClientRect();
  spot.style.background = `radial-gradient(260px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(255,255,255,0.14), transparent 70%)`;
};

export const spotClear = (e) => {
  const spot = e.currentTarget.querySelector(".card-spot");
  if (spot) spot.style.background = "transparent";
};
