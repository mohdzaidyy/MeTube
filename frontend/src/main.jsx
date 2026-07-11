import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#181820",
              color: "#f4f4f5",
              border: "1px solid #26262f",
              fontSize: "0.875rem",
            },
            success: { iconTheme: { primary: "#8b5cf6", secondary: "#fff" } },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
