// Get the highlight button
const highlightButton = document.getElementById("highlight-button");
// Add an event listener to the button
highlightButton.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: highlightText,
  });
});

function highlightText() {
  const selectedText = window.getSelection().toString();
  const innerText = window.getSelection().anchorNode.parentElement.innerHTML;

  const highlightedText = innerText.replace(
    selectedText,
    `<span style="display:inline-block;background-color:yellow">${selectedText}</span>`
  );

  window.getSelection().anchorNode.parentElement.innerHTML = highlightedText;
}
