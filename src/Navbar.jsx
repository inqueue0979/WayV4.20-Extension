function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="wayv.png" className="h-6 mr-0 pr-0" alt="WayV 로고" />
                <span className="self-center text-lg font-semibold whitespace-nowrap ml-1 Pretendard-Bold">webridge</span>
            </a>
            <button type="button" className="inline-flex items-center p-1 w-6 h-6 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none">
                <span className="sr-only">Login</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
        </div>
        </nav>
  ); 
}

export default Navbar;