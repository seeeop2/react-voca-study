// DayList.tsx: 날짜(일차) 목록을 보여주는 컴포넌트
// 각 요일을 클릭하면 해당 요일의 단어 목록 페이지로 이동
import {Link} from "react-router-dom";
import React from "react";
import useFetch from "../hooks/useFetch";

// 요일 데이터 타입 정의
interface IDay {
  id: number; // 고유 식별자
  day: number; // 날짜(일차)
}

export default function DayList() {
  // days: 요일(일차) 목록 상태. useFetch<IDay>로 IDay 객체 배열을 받아옴
  const days = useFetch<IDay>("http://localhost:3001/days");

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