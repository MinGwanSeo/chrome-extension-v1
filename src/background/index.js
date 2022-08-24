chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.url) {
    const { url } = tab;
    const urlWithPath = url.split("?")[0];
    if (urlWithPath.includes("https://www.youtube.com/watch")) {
      chrome.scripting.executeScript({
        target: { tabId },
        files: ["injection/addButton.js"],
      });
    }
  }
  return true;
});

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let tab = await chrome.tabs.query(queryOptions);
  return tab[0];
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  (async function () {
    if (request.command === "whereIAm") {
      const tab = await getCurrentTab();
      sendResponse(tab.url);
    }
  })();
  return true;
});
