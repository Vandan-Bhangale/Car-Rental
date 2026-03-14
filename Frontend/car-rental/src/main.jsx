import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { CarProvider } from "./context/carContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CarProvider>
      <App />
      </CarProvider>
    </AuthProvider>
  </StrictMode>,
);
