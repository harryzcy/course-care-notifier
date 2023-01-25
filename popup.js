const checkbox = document.querySelector("input[type=checkbox]");
chrome.storage.local.get(["soundEnabled"], (result) => {
  checkbox.checked = result.soundEnabled;
});
checkbox.addEventListener("change", () => {
  chrome.storage.sync.set({ soundEnabled: checkbox.checked });
});
