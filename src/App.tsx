import React from 'react';
import './App.css';
import Header from "./component/Header";

// App 컴포넌트: 애플리케이션의 루트 컴포넌트
function App() {
  return (
      <div className="App">
        {/* 상단 헤더 영역 */}
        <Header/>
      </div>
  );
}

export default App;
