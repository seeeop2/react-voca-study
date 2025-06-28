// DayList.tsx: 전체 요일(일차) 목록을 보여주고, 각 요일 클릭 시 해당 단어 목록 페이지로 이동하는 컴포넌트
// useFetch 커스텀 훅을 사용하여 서버에서 요일 데이터를 받아옴
// days 배열이 비어 있으면 로딩 메시지 출력
import {Link} from "react-router-dom";
import React from "react";
import useFetch from "../hooks/useFetch";

// 요일 데이터 타입 정의
export interface IDay {
  id: number; // 고유 식별자
  day: number; // 날짜(일차)
}

export default function DayList() {
  // days: 서버에서 받아온 요일(일차) 목록 (IDay 객체 배열)
  // useFetch는 비동기적으로 데이터를 받아오며, 초기값은 빈 배열
  const days = useFetch<IDay>("http://localhost:3001/days");

  if (days.length === 0) {
    // days 배열이 비어 있으면 데이터 로딩 중임을 의미
    return <span>Loading...</span>;
  }

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