chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
      chrome.tabs.create({
        url: "https://docs.google.com/forms/d/17CT0E3JICiOOKpeS_nGHDqiLcK2g1MS0tfOnC9sJBRE/edit" // 확장프로그램 설치시 열 URL (추후 설문조사로 변경 필요)
      });
    }
  });