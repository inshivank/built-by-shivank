import { themeStorageKey } from "@/config/theme";

export function ThemeScript() {
  const script = `
    (function () {
      try {
        var storageKey = "${themeStorageKey}";
        var theme = localStorage.getItem(storageKey);
        var root = document.documentElement;

        if (theme === "light") {
          root.classList.remove("dark");
          return;
        }

        root.classList.add("dark");
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
