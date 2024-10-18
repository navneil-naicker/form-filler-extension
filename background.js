// Listen for when the user clicks on the extension icon
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { action: "fillForm" });
});
