import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Use Vite's base URL so BrowserRouter matches paths when hosted under a repo path (GitHub Pages)
          import.meta.env.BASE_URL includes a trailing slash (e.g. '/iiit-campus-helper/').
          Remove trailing slash to produce a valid basename for react-router. */}
      <BrowserRouter
        // Use Vite's BASE_URL (includes trailing slash, e.g. '/iiit-campus-helper/')
        // React Router accepts a basename with a trailing slash as well.
        basename={import.meta.env.BASE_URL || "/"}
      >
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
