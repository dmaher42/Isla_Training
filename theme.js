// theme.js
// Simple theme toggle with persistence.

(() => {
  const KEY = "kid_plan_theme_v1";
  const root = document.documentElement;

  function setTheme(theme){
    if (theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    localStorage.setItem(KEY, theme);
    updateButton(theme);
  }

  function getSavedTheme(){
    const saved = localStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") return saved;
    // Default: follow system preference
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark" : "light";
  }

  function updateButton(theme){
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    const isDark = theme === "dark";
    btn.textContent = isDark ? "☀️ Light" : "🌙 Dark";
    btn.setAttribute("aria-pressed", String(isDark));
  }

  function toggle(){
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    setTheme(current === "dark" ? "light" : "dark");
  }

  // Apply theme ASAP
  const initial = getSavedTheme();
  setTheme(initial);

  // Hook button
  window.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("themeToggle");
    if (btn) btn.addEventListener("click", toggle);
  });
})();
