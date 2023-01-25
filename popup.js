const checkbox = document.querySelector("input[type=checkbox]");
chrome.storage.local.get(["soundEnabled"], (result) => {
  checkbox.checked = result.soundEnabled;
});
checkbox.addEventListener("change", () => {
  chrome.storage.local.set({ soundEnabled: checkbox.checked });
});
