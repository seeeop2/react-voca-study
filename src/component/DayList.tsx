// DayList.tsx: 날짜(일차) 목록을 보여주는 컴포넌트
// 각 요일을 클릭하면 해당 요일의 단어 목록 페이지로 이동
import {Link} from "react-router-dom";
import React, {useEffect} from "react";

// 요일 데이터 타입 정의
interface IDay {
  id: number; // 고유 식별자
  day: number; // 날짜(일차)
}

export default function DayList() {
  // days 상태: 날짜(일차) 목록을 저장
  const [days, setDays] = React.useState<IDay[]>([]);

  // 컴포넌트 마운트 시 날짜(일차) 데이터 fetch
  useEffect(() => {
    fetch('http://localhost:3001/days') // API에서 일차(날짜) 데이터 가져오기
    .then(response => response.json()) // 응답을 JSON으로 변환
    .then(data => setDays(data)) // 가져온 데이터를 상태에 저장
  }, []);

  // 렌더링: 요일 목록을 리스트로 출력
  return (
      <ul className="list_day">
        {/* days 배열을 순회하며 각 요일을 리스트 아이템으로 렌더링 */}
        {days.map(day => (
            <li key={day.id}>
              {/* 각 요일 클릭 시 해당 요일의 단어 목록 페이지로 이동 */}
              <Link to={`/day/${day.day}`}>Day {day.day}</Link>
            </li>
        ))}
      </ul>
  );
}