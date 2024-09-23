function App() {
  return (
    <div className=" w-[300px] h-[500px]">
      <main className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-gradient-to-r from-blue-300 to-green-300 p-4 rounded-3xl mb-1 animate-bounce">
          <img src="/wayv.png" alt="WayV 로고" width={100} height={100} />
        </div>
        <p className="Pretendard-Bold text-xl">웹브릿지</p>
        <p className="text-sm"><strong className="Pretendard-Bold">웹 접근성</strong> 검사 툴킷</p>
        <div className="mt-8">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            시작하기
          </button>
        </div>

        <div className="flex w-full max-w-xl items-center space-x-2">
        </div>
      </div>
    </main>
    </div>
  ); 
}

export default App;