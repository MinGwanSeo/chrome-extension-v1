import { open, close } from "./appController";

minGwanSeo_youtube_t = undefined;

const button = document.createElement("button");
button.id = "mingwanseo-btn";
button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14 9l-2.519 4-2.481-1.96-5 6.96h16l-6-9zm8-5v16h-20v-16h20zm2-2h-24v20h24v-20zm-20 6c0-1.104.896-2 2-2s2 .896 2 2c0 1.105-.896 2-2 2s-2-.895-2-2z"/></svg>`;
button.style.height = "100%";
button.style.fill = "white";
button.style.display = "flex";
button.style.justifyContent = "center";
button.style.alignItems = "center";
button.classList = "ytp-button";

button.onclick = () => {
  const prevApp = document.querySelector("#mingwanseo-app");
  if (prevApp) {
    close();
  } else {
    open();
  }
};

prevHref = location.href;

makeButton();
const observer = new MutationObserver((mutations) => {
  for (let i = 0; i < mutations.length; i++) {
    if (prevHref !== location.href) {
      makeButton();
      window.postMessage("hrefchange");
      break;
    }
  }
  prevHref = location.href;
});

observer.observe(document.querySelector("body"), {
  childList: true,
  subtree: true,
});

function makeButton() {
  const target = document.querySelector(".ytp-right-controls");
  const prevBtn = document.querySelector("#mingwanseo-btn");
  if (target && !prevBtn) {
    target.insertAdjacentElement("beforeBegin", button);
  }
}
