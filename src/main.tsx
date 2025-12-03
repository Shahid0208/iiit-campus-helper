import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Ensure favicon uses the Vite base (repo path) when hosted on GitHub Pages
try {
	const faviconEl = document.getElementById("favicon") as HTMLLinkElement | null;
	if (faviconEl) {
		const base = (import.meta.env.BASE_URL || "/");
		faviconEl.href = base + "favicon.ico";
	}
} catch (e) {
	// ignore if running in an environment without import.meta
}

createRoot(document.getElementById("root")!).render(<App />);
