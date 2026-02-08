// background.js - Minimal service worker for MV3 extension
console.log("UAPS Extension: Background service worker loaded.");

// Listen for extension installation or updates
chrome.runtime.onInstalled.addListener(() => {
  console.log("UAPS Extension: Installed or updated.");
});