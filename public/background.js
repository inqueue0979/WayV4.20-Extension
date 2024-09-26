chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
      chrome.tabs.create({
        url: "https://wayv.vercel.app" // 확장프로그램 설치시 열 URL (추후 설문조사로 변경 필요)
      });
    }
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'highlightImages') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: highlightImagesWithoutAlt
        });
      });
    }
  });
  
  function highlightImagesWithoutAlt() {
    const problematicImages = document.querySelectorAll('img:not([alt])');
    problematicImages.forEach(img => {
      img.style.border = "5px solid red";
    });
  }