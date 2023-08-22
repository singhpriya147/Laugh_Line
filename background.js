// background.js

// Listen for messages from the extension popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'openWhatsAppTab' && message.url) {
    // Open a new tab with the WhatsApp share link
    chrome.tabs.create({ url: message.url });
  }
});
