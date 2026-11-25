import { useEffect, useLayoutEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import About from "./pages/About";
import MenuPage from "./pages/MenuPage";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Page switching.
 *
 * The new page renders immediately. Previously AnimatePresence mode="wait" kept the new
 * page unmounted until the old one finished fading out; while that ran the screen was blank,
 * and if the fade was ever interrupted or stalled (busy phone, background tab, quick double
 * click) the new page never appeared — the "white page" bug.
 *
 * Now: jump to the top before paint, mount the new page straight away, and fade it in with a
 * CSS animation (.page-enter), which completes even when JavaScript is busy.
 */
const AppRoutes = () => {
  const location = useLocation();
  const firstRender = useRef(true);

  useLayoutEffect(() => {
    // "instant" overrides the CSS smooth scrolling so the new page doesn't visibly scroll up.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return (
    <ErrorBoundary resetKey={location.pathname}>
      {/* No fade on the very first load / refresh, so nothing moves while the page appears. */}
      <div key={location.pathname} className={firstRender.current ? undefined : "page-enter"}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
