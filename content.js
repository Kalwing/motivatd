chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSource") {
    sendResponse(document.documentElement.outerHTML);
  }
});
