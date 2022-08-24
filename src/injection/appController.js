import React from "react";
import { createRoot } from "react-dom/client";
import App from "./injectedApp/Components/app";

minGwanSeo_t = undefined;

export function createApp() {
  const container = document.createElement("div");
  container.id = "mingwanseo-app";
  container.style.position = "relative";
  container.style.marginBottom = "12px";
  container.style.boxSizing = "borderBox";
  const root = createRoot(container);
  root.render(<App />);

  return container;
}

function debouncedHandleResize() {
  if (minGwanSeo_t) {
    clearTimeout(minGwanSeo_t);
  }
  t = setTimeout(handleResize, 400);
}

function handleResize() {
  const prevApp = document.querySelector("#mingwanseo-app") || createApp();

  const targetPortrait = document.querySelector("#columns > #secondary");
  const targetLandscape = document.querySelector("ytd-watch-metadata");

  if (window.innerWidth <= 1000) {
    targetLandscape.insertAdjacentElement("beforebegin", prevApp);
  } else {
    targetPortrait.insertAdjacentElement("afterbegin", prevApp);
  }
}

export function open() {
  window.addEventListener("resize", debouncedHandleResize);
  handleResize();
}

export function close() {
  window.removeEventListener("resize", debouncedHandleResize);
  const prevApp = document.querySelector("#mingwanseo-app");
  if (prevApp) {
    prevApp.remove();
  }
}
