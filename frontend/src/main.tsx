import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { ContextProvider } from "./context/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProvider>
      <App />
      <Toaster
        toastOptions={{
          style: {
            // background: "#315F42",
            background: "#000",
            color: "#fff",
          },
        }}
        theme="dark"
        richColors
        position="bottom-right"
        closeButton={false}
      />
    </ContextProvider>
  </StrictMode>,
);
