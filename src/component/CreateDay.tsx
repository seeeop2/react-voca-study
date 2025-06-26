import React from "react";
import useFetch from "../hooks/useFetch";
import {IDay} from "./DayList";
import {useNavigate} from "react-router-dom";

export default function CreateDay() {
  // days: 서버에서 Day 목록을 불러오는 커스텀 훅
  const days = useFetch<IDay>("http://localhost:3001/days");
  // navigate: 페이지 이동을 위한 react-router 훅
  const navigate = useNavigate();

  // Day 추가 버튼 클릭 시 실행되는 함수
  function addDay(e: React.MouseEvent) {
    e.preventDefault(); // 버튼 클릭 시 페이지 새로고침 방지

    // 새로운 Day를 서버에 추가하는 POST 요청
    fetch(`http://localhost:3001/days`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        day: days.length + 1, // 현재 일수에 1을 더하여 새로운 일차 생성
      }),
    })
    .then(response => {
      if (response.ok) {
        alert("새로운 Day가 추가되었습니다.");
        // Day 추가 후 메인 페이지로 이동
        navigate("/");
      } else {
        console.error("Day 추가 실패:", response.statusText);
      }
    })
  }

  return (
      <>
        {/* 현재 등록된 일수 출력 */}
        <h2>현재 일수: {days.length}일</h2>
        <button className="btn_create_day" onClick={addDay}>Day 추가</button>
      </>
  );
}