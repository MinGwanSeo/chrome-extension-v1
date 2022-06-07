import React from "react";
import { createRoot } from "react-dom/client";
import App from "./injectedApp/app";

const container = document.createElement("div");
container.id = "netflix-chat";
container.style = `
      width: 100px;
      height: 100px;
      position: fixed;
      right: 100px;
      bottom: 100px;
      z-index: 100;
    `;
const root = createRoot(container);
document.body.appendChild(container);
root.render(<App />);

console.log("Button added");
