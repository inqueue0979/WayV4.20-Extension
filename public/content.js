let currentUrl = window.location.href;

console.log("Current tab URL: " + currentUrl);

const observer = new MutationObserver(() => {
  if (currentUrl !== window.location.href) {
    console.log('URL changed to: ' + window.location.href);
    currentUrl = window.location.href;
  }
});

// DOM 변화를 감지하여 URL 변경을 추적
observer.observe(document, { subtree: true, childList: true });