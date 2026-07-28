// Applies saved display settings (theme, filters, typography, vinyl
// visibility, language attribute) to the document. Shared by the Settings
// panel and app startup, so settings take effect on every page — including
// hard reloads of pages that don't render the navbar.

export function applyUserSettings(s) {
  const root = document.documentElement;

  root.style.fontSize = s.biggerText ? "120%" : "100%";

  if (s.biggerCursor) root.classList.add("custom-cursor");
  else root.classList.remove("custom-cursor");

  const lhMap = { normal: "1.5", relaxed: "1.8", loose: "2" };
  root.style.lineHeight = lhMap[s.lineHeight] || "1.5";

  if (s.stopAnimations) root.classList.add("no-animations");
  else root.classList.remove("no-animations");

  const invertVal = s.invertColors ? "invert(1) hue-rotate(180deg)" : "invert(0)";
  root.style.filter = `brightness(${s.brightness ?? 100}%) contrast(${s.contrast ?? 100}%) ${invertVal}`;

  if (s.theme === "light") {
    root.classList.add("light");
    root.classList.remove("dark");
  } else {
    root.classList.add("dark");
    root.classList.remove("light");
  }

  let vinylState = "none";
  if (s.hideVinylEntirely) vinylState = "all";
  else if (s.hideVinylArtistOnly) vinylState = "artist";
  root.setAttribute("data-hide-vinyl", vinylState);

  if (s.language) root.setAttribute("lang", s.language);
}

export function applyStoredUserSettings() {
  try {
    const saved = localStorage.getItem("userSettings");
    if (saved) applyUserSettings(JSON.parse(saved));
  } catch {
    // corrupted settings — defaults apply
  }
}
