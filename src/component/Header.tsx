// Header.tsx: 사이트 상단의 네비게이션 바 컴포넌트
// 사이트 타이틀과 주요 메뉴(단어 추가, 날짜 추가) 버튼을 제공
import {Link} from "react-router-dom";

// Header 컴포넌트 정의
export default function Header() {
  return (
      <header className="header">
        {/* 사이트 타이틀: 클릭 시 메인 페이지로 이동 */}
        <h1>
          <Link to="/">HSK 단어 모음</Link>
        </h1>
        {/* 메뉴 영역: 주요 기능 버튼(단어 추가, 날짜 추가) */}
        <div className="menu">
          {/* 단어 추가 버튼: 새로운 단어를 추가하는 기능 (추후 구현 예정) */}
          <a href="#x" className="link">단어 추가</a>
          {/* 날짜 추가 버튼: 새로운 날짜(일차)를 추가하는 기능 (추후 구현 예정) */}
          <a href="#x" className="link">날짜 추가</a>
        </div>
      </header>
  );
}