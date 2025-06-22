// Header 컴포넌트: 상단 네비게이션 및 타이틀 영역
export default function Header() {
  return (
      <header className="header">
        {/* 사이트 타이틀 */}
        <h1>
          <a href="/">HSK 단어 모음</a>
        </h1>
        {/* 메뉴 영역 */}
        <div className="menu">
          {/* 단어 추가 버튼 */}
          <a href="#x" className="link">단어 추가</a>
          {/* 날짜 추가 버튼 */}
          <a href="#x" className="link">날짜 추가</a>
        </div>
      </header>
  );
}