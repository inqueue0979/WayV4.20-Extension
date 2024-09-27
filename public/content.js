function toggleAltHighlight(isChecked) {
  const problematicImages = document.querySelectorAll('img:not([alt])');
  
  problematicImages.forEach(img => {
    if (isChecked) {
      // 빨간 테두리 및 블러 처리 적용
      img.style.border = "5px solid red";
      img.style.filter = "blur(5px)"; 

      // 빗금 처리 추가 (반투명한 대각선 스트라이프 패턴)
      img.style.backgroundImage = "repeating-linear-gradient(45deg, rgba(255, 0, 0, 0.2) 0, rgba(255, 0, 0, 0.2) 10px, transparent 10px, transparent 20px)";
      img.style.backgroundSize = "100% 100%";  // 빗금 패턴 적용

      // 느낌표 추가
      if (!img.parentElement.querySelector('.warning-icon')) {
        const warningIcon = document.createElement('div');
        warningIcon.classList.add('warning-icon');
        warningIcon.innerHTML = '대체텍스트 오류';  // 느낌표 아이콘
        warningIcon.style.position = 'absolute';
        warningIcon.style.top = '50%'
        warningIcon.style.left = '50%';
        warningIcon.style.transform = 'translate(-50%, -50%)'; // 중앙 정렬
        warningIcon.style.fontSize = '16px'; // 느낌표 크기
        warningIcon.style.color = 'red';
        warningIcon.style.background = 'white';
        warningIcon.style.padding = '5px';
        img.parentElement.style.position = 'relative'; // 부모 요소에 위치 설정
        img.parentElement.appendChild(warningIcon);
      }
    } else {
      // 테두리, 블러, 빗금 및 느낌표 제거
      img.style.border = "none";
      img.style.filter = "none";
      img.style.backgroundImage = "none"; // 빗금 패턴 제거
      const warningIcon = img.parentElement.querySelector('.warning-icon');
      if (warningIcon) {
        warningIcon.remove();
      }
    }
  });
}

function toggleVideoHighlight(isChecked) {
  const problematicVideos = document.querySelectorAll('video');

  problematicVideos.forEach(video => {
    let issues = [];

    // 썸네일 확인
    const thumbnail = video.getAttribute('poster');
    if (!thumbnail) {
      issues.push("썸네일 없음");
    }

    // 텍스트 대본 확인
    const transcript = video.nextElementSibling && video.nextElementSibling.classList.contains('transcript');
    if (!transcript) {
      issues.push("텍스트 대본 없음");
    }

    // 오디오 설명 확인
    const audioDescription = video.nextElementSibling && video.nextElementSibling.classList.contains('audio-description');
    if (!audioDescription) {
      issues.push("오디오 설명 없음");
    }

    // 키보드 접근성 확인
    const keyboardAccess = video.getAttribute("tabindex") !== null;
    if (!keyboardAccess) {
      issues.push("키보드 접근 불가");
    }

    // 스크린 리더 호환성 확인 (ARIA 속성)
    const ariaLabels = video.closest('[aria-label], [role]');
    if (!ariaLabels) {
      issues.push("ARIA 라벨 없음");
    }

    // 문제가 있으면 빨간 테두리, 블러 처리, 빗금 처리, 그리고 느낌표 추가
    if (issues.length > 0 && isChecked) {
      video.style.border = "5px solid red";
      video.style.filter = "blur(5px)";

      // 빗금 처리 추가 (반투명한 대각선 스트라이프 패턴)
      video.style.backgroundImage = "repeating-linear-gradient(45deg, rgba(255, 0, 0, 0.2) 0, rgba(255, 0, 0, 0.2) 10px, transparent 10px, transparent 20px)";
      video.style.backgroundSize = "100% 100%";  // 빗금 패턴 적용

      // 느낌표 추가
      if (!video.parentElement.querySelector('.warning-icon')) {
        const warningIcon = document.createElement('div');
        warningIcon.classList.add('warning-icon');
        warningIcon.innerHTML = "영상 오류: " + issues.join(", ");  // 느낌표 아이콘
        warningIcon.style.position = 'absolute';
        warningIcon.style.top = '50%';
        warningIcon.style.left = '50%';
        warningIcon.style.transform = 'translate(-50%, -50%)'; // 중앙 정렬
        warningIcon.style.fontSize = '48px'; // 느낌표 크기
        warningIcon.style.color = 'red';
        warningIcon.style.background = 'white';
        warningIcon.style.padding = '5px';
        video.parentElement.style.position = 'relative'; // 부모 요소에 위치 설정
        video.parentElement.appendChild(warningIcon);
      }
    } else {
      // 테두리, 블러, 빗금 및 느낌표 제거
      video.style.border = "none";
      video.style.filter = "none";
      video.style.backgroundImage = "none"; // 빗금 패턴 제거
      const warningIcon = video.parentElement.querySelector('.warning-icon');
      if (warningIcon) {
        warningIcon.remove();
      }
    }
  });
}

function toggleTabAccessibleHighlight(isChecked) {
  // 탭 키로 접근 가능한 기본 요소들 + tabindex가 설정된 요소 선택
  const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');

  focusableElements.forEach(element => {
    // 요소가 표시되고 활성화된 경우 접근 가능
    const isFocusable = element.offsetParent !== null && !element.disabled && element.tabIndex >= 0;

    if (!isFocusable && isChecked) {
      // 탭 키로 접근 불가능한 요소에 파란색 테두리 적용
      element.style.border = "3px solid blue";
    } else {
      // 테두리 제거
      element.style.border = "none";
    }
  });
}

function calculateContrastRatio(fgColor, bgColor) {
  // RGB 문자열에서 숫자를 추출하여 색상을 파싱
  function parseRGB(color) {
    const rgb = color.match(/\d+/g).map(Number); // RGB 값을 배열로 변환
    return rgb.length === 4 ? rgb.slice(0, 3) : rgb; // RGBA 형식은 투명도 제거
  }

  // 명도 계산
  function luminance([r, g, b]) {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  const fg = parseRGB(fgColor);
  const bg = parseRGB(bgColor);

  const l1 = luminance(fg) + 0.05;
  const l2 = luminance(bg) + 0.05;

  return l1 > l2 ? l1 / l2 : l2 / l1;
}

function getElementBackgroundColor(element) {
  let bgColor = window.getComputedStyle(element).backgroundColor;

  // 배경색이 투명한 경우 상위 요소에서 배경색을 찾음
  while (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
    element = element.parentElement;
    if (!element) break; // 더 이상 부모 요소가 없으면 중단
    bgColor = window.getComputedStyle(element).backgroundColor;
  }
  
  return bgColor;
}

function wrapProblematicText(element, fgColor, bgColor) {
  const contrastRatio = calculateContrastRatio(fgColor, bgColor);
  if (contrastRatio < 4.5) {
    // 텍스트를 span으로 감싸고 테두리 적용
    const textNodes = Array.from(element.childNodes).filter(node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim());
    
    textNodes.forEach(node => {
      const span = document.createElement('span');
      span.style.border = "2px solid yellow"; // 문제 있는 텍스트에 노란색 테두리 적용
      span.style.display = "inline-block"; // 인라인 블록으로 설정하여 테두리 제대로 표시
      span.textContent = node.nodeValue; // 텍스트를 span에 복사

      // 기존 텍스트 노드를 span으로 대체
      node.parentNode.replaceChild(span, node);
    });
  }
}

function checkContrastAndHighlight(isChecked) {
  if (!isChecked) {
    // 체크 해제 시, 기존 span 제거하고 원래 텍스트 복원 (간단한 방식으로 적용)
    document.querySelectorAll('span').forEach(span => {
      if (span.style.border === '2px solid yellow') {
        span.replaceWith(span.textContent); // 원래 텍스트로 복원
      }
    });
    return;
  }

  const elements = document.querySelectorAll('*:not(script):not(style):not(link)'); // 모든 요소 선택
  elements.forEach(element => {
    const text = element.textContent.trim();
    if (text) {
      // 요소의 텍스트 색상과 배경색 가져오기
      const fgColor = window.getComputedStyle(element).color;
      const bgColor = getElementBackgroundColor(element);  // 배경색 가져오기

      // 명도 대비가 충분하지 않으면 텍스트에만 노란 테두리 적용
      wrapProblematicText(element, fgColor, bgColor);
    }
  });
}

function checkTableStructureAndHighlight(isChecked) {
  if (!isChecked) {
    // 체크 해제 상태일 경우, 모든 테두리 제거
    document.querySelectorAll('table').forEach(table => {
      table.style.border = "none";
    });
    return;
  }

  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    const headers = table.querySelectorAll('th'); // 테이블 헤더(th) 요소 찾기
    const rows = table.querySelectorAll('tr'); // 테이블 행(tr) 요소 찾기

    // 헤더와 행이 둘 다 있는 경우를 준수한 것으로 간주
    const compliant = headers.length > 0 && rows.length > 0;

    if (!compliant) {
      // 준수하지 않으면 초록색 테두리 적용
      table.style.border = "3px solid green";
    } else {
      // 준수하는 경우 테두리 제거
      table.style.border = "none";
    }
  });
}

function checkLabelsAndHighlight(isChecked) {
  if (!isChecked) {
    // 체크 해제 상태일 경우, 모든 테두리 제거
    document.querySelectorAll('input, select, textarea').forEach(inputElement => {
      inputElement.style.border = "none";
    });
    return;
  }

  const inputElements = document.querySelectorAll('input, select, textarea');

  inputElements.forEach(inputElement => {
    const id = inputElement.getAttribute('id');
    let label = null;

    // id 속성이 있는 경우 해당 id를 참조하는 label 찾기
    if (id) {
      label = document.querySelector(`label[for="${id}"]`);
    }

    // 레이블이 없으면 빨간 테두리 적용
    if (!label) {
      inputElement.style.border = "3px solid red";
    } else {
      // 레이블이 있으면 테두리 제거
      inputElement.style.border = "none";
    }
  });
}

function checkLinkTextAndHighlight(isChecked) {
  if (!isChecked) {
    // 체크 해제 상태일 경우, 모든 테두리 제거
    document.querySelectorAll('a').forEach(link => {
      link.style.border = "none";
    });
    return;
  }

  const links = document.querySelectorAll('a');

  links.forEach(link => {
    const linkText = link.textContent.trim();
    let problematic = false;

    // 링크 텍스트가 없는 경우
    if (!linkText) {
      problematic = true;
    }

    // 링크 텍스트가 모호한 경우 (예: "여기 클릭", "자세히 보기" 등)
    const vagueTexts = ["여기 클릭", "자세히 보기", "더 알아보기", "Click here", "Read more", "Learn more"];
    if (vagueTexts.includes(linkText)) {
      problematic = true;
    }

    // 문제가 있는 경우 빨간 테두리 적용
    if (problematic) {
      link.style.border = "3px solid red";
    } else {
      link.style.border = "none"; // 문제가 없으면 테두리 제거
    }
  });
}

 
// chrome.storage에서 상태 가져와서 적용
chrome.storage.sync.get('isChecked', (result) => {
  toggleAltHighlight(result.isChecked || false);
  toggleVideoHighlight(result.isChecked || false);
  toggleTabAccessibleHighlight(result.isChecked || false);
  checkContrastAndHighlight(result.isChecked || false);
  checkTableStructureAndHighlight(result.isChecked || false);
  checkLabelsAndHighlight(result.isChecked || false);
  checkLinkTextAndHighlight(result.isChecked || false);
});

// storage 변경 감지하여 실시간으로 반영
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.isChecked) {
    toggleAltHighlight(changes.isChecked.newValue);
    toggleVideoHighlight(changes.isChecked.newValue);
    toggleTabAccessibleHighlight(changes.isChecked.newValue);
    checkContrastAndHighlight(changes.isChecked.newValue);
    checkTableStructureAndHighlight(changes.isChecked.newValue);
    checkLabelsAndHighlight(changes.isChecked.newValue);
    checkLinkTextAndHighlight(changes.isChecked.newValue);
  }
});