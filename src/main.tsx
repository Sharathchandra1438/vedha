import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Always open at the top on load / refresh. Letting the browser restore the old scroll position
// made the page and header jump while the restored position settled.
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(<App />);
