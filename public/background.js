chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
      chrome.tabs.create({
        url: "https://wayv.vercel.app" // 확장프로그램 설치시 열 URL (추후 설문조사로 변경 필요)
      });
    }
  });