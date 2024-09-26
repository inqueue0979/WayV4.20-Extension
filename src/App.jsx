import React, { useState } from 'react';

function App() {
  // 스위치 상태를 관리하는 state
  const [isChecked, setIsChecked] = useState(false);

  // 스위치 클릭 시 alt 속성이 없는 img 태그에 빨간 테두리 적용/해제하는 함수
  const toggleHighlightImagesWithoutAlt = () => {
    setIsChecked(!isChecked); // 스위치 상태를 토글

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
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex w-full max-w-xl items-center space-x-2"></div>
        </div>
      </main>
    </div>
  );
}

export default App;