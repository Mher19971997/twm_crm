import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { ArgonControllerProvider } from "context";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import 'react-phone-input-2/lib/material.css';
import { AuthContextProvider } from "context";
import { QueryClient, QueryClientProvider } from "react-query";
import I18nProvider from "components/I18nProvider/index.js";
import i18n from "./i18n.js";
import LoadingPage from "components/LoadingPage/index.js";

const queryClient = new QueryClient();
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Suspense fallback={<LoadingPage />}>
    <I18nProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <ArgonControllerProvider>
              <PerfectScrollbar>
                <App />
              </PerfectScrollbar>
            </ArgonControllerProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </I18nProvider>
  </Suspense>
);
