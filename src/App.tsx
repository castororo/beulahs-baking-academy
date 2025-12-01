import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import PageErrorBoundary from "@/components/PageErrorBoundary";
import HomePage from "./pages/HomePage";
import AcademyPage from "./pages/AcademyPage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary showDetails={import.meta.env.DEV}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <ErrorBoundary>
              <Header />
            </ErrorBoundary>
            <main className="flex-1">
              <Routes>
                <Route
                  path="/"
                  element={
                    <PageErrorBoundary pageName="Home">
                      <HomePage />
                    </PageErrorBoundary>
                  }
                />
                <Route
                  path="/academy"
                  element={
                    <PageErrorBoundary pageName="Academy">
                      <AcademyPage />
                    </PageErrorBoundary>
                  }
                />
                <Route
                  path="/shop"
                  element={
                    <PageErrorBoundary pageName="Shop">
                      <ShopPage />
                    </PageErrorBoundary>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <PageErrorBoundary pageName="Contact">
                      <ContactPage />
                    </PageErrorBoundary>
                  }
                />
                <Route
                  path="/privacy-policy"
                  element={
                    <PageErrorBoundary pageName="Privacy Policy">
                      <PrivacyPolicy />
                    </PageErrorBoundary>
                  }
                />
                <Route
                  path="/terms-of-service"
                  element={
                    <PageErrorBoundary pageName="Terms of Service">
                      <TermsOfService />
                    </PageErrorBoundary>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <ErrorBoundary>
              <Footer />
            </ErrorBoundary>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
