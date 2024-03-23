chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkAndCloseTab" && sender.tab) {
        chrome.tabs.get(sender.tab.id, (tab) => {
            if (tab.title !== "Game Console") {
                chrome.tabs.remove(sender.tab.id);
            }
        });
    }
});
