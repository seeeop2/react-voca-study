// App.tsx: 애플리케이션의 루트 컴포넌트
// 전체 라우팅, 레이아웃, 글로벌 컴포넌트 관리

// React 및 라우터, 스타일, 주요 컴포넌트 import
import React from 'react';
import './App.css';
import Day from "./component/Day";
import DayList from "./component/DayList";
import Header from "./component/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import EmptyPage from "./component/EmptyPage";

// App 컴포넌트 정의
function App() {
  return (
      <BrowserRouter>
        <div className="App">
          {/* 상단 헤더 영역: 사이트 타이틀 및 메뉴 */}
          <Header/>
          {/* 라우팅 영역: URL 경로에 따라 페이지 컴포넌트 렌더링 */}
          <Routes>
            {/* 루트(/): 일차 목록 페이지 */}
            <Route path="/" element={<DayList/>}/>
            {/* /day/:day: 선택된 일차의 단어 목록 페이지 */}
            <Route path="/day/:day" element={<Day/>}/>
            {/* 그 외 모든 경로: 404 Not Found 페이지 */}
            <Route path="*" element={<EmptyPage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
