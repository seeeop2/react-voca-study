import React from 'react';
import './App.css';
import Header from "./component/Header";
import DayList from "./component/DayList";
import Day from "./component/Day";

// App 컴포넌트: 애플리케이션의 루트 컴포넌트
function App() {
  return (
      <div className="App">
        {/* 상단 헤더 영역 */}
        <Header/>
        {/* 일차 목록 */}
        <DayList/>
        {/* 선택된 일차의 상세 단어 목록 */}
        <Day/>
      </div>
  );
}

export default App;
