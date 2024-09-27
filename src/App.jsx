import React, { useState, useEffect } from 'react';

function App() {
  // 스위치 상태를 관리하는 state
  const [isChecked, setIsChecked] = useState(false);
  
  // chrome.storage에서 토글 상태를 불러옴
  useEffect(() => {
    chrome.storage.sync.get('isChecked', (result) => {
      if (result.isChecked !== undefined) {
        setIsChecked(result.isChecked);
      }
    });
  }, []);
  
  // 스위치 클릭 시 alt 속성이 없는 img 태그에 빨간 테두리 적용/해제하는 함수
  const toggleHighlightImagesWithoutAlt = () => {
    setIsChecked(!isChecked); // 스위치 상태를 토글

    // chrome.storage에 새로운 상태 저장
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    chrome.storage.sync.set({ isChecked: newCheckedState });

    // alt 속성이 없는 img 태그 선택
    const problematicImages = document.querySelectorAll('img:not([alt])');

    // 문제 있는 이미지에 빨간색 테두리 적용 또는 해제
    problematicImages.forEach(img => {
      if (!isChecked) {
        img.style.border = "5px solid red"; // 빨간 테두리 적용
      } else {
        img.style.border = "none"; // 테두리 제거
      }
    });
  };

  return (
    <div className="w-[300px] h-[500px]">
      <main className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-gradient-to-r from-blue-300 to-green-300 p-4 rounded-3xl mb-1">
            <img src="/wayv.png" alt="WayV 로고" width={100} height={100} />
          </div>
          <p className="Pretendard-Bold text-xl">웹브릿지</p>
          <p className="text-sm">
            <strong className="Pretendard-Bold">웹 접근성</strong> 검사 툴킷
          </p>
          <div className="mt-8">
            <label className="items-center space-x-2 inline-flex cursor-pointer">
              <input 
                type="checkbox" 
                className="toggle-switch sr-only peer" 
                checked={isChecked} 
                onChange={toggleHighlightImagesWithoutAlt} 
              />
              <div class="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>
          <div className="flex w-full max-w-xl items-center space-x-2"></div>
        </div>
      </main>
    </div>
  );
}

export default App;