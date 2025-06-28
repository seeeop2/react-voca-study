import React from "react";
import useFetch from "../hooks/useFetch";
import {IDay} from "./DayList";
import {useNavigate} from "react-router-dom";

export default function CreateDay() {
  // days: 서버에서 Day 목록을 불러오는 커스텀 훅
  const days = useFetch<IDay>("http://localhost:3001/days");
  // navigate: 페이지 이동을 위한 react-router 훅
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false); // 로딩 상태 관리

  // Day 추가 버튼 클릭 시 실행되는 함수
  function addDay(e: React.MouseEvent) {
    e.preventDefault(); // 버튼 클릭 시 페이지 새로고침 방지

    if (!isLoading) {
      setIsLoading(true); // 로딩 상태로 변경

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
          alert("새로운 Day가 추가되었습니다."); // 성공 시 알림 표시
          // Day 추가 후 메인 페이지로 이동
          navigate("/");
          setIsLoading(false); // 로딩 상태 해제
        } else {
          // 실패 시 에러 메시지 출력
          console.error("Day 추가 실패:", response.statusText);
        }
      })
      // 네트워크 에러 등 예외 처리 필요 시 catch 추가 가능
      .catch(error => console.error(error));
    }
  }

  if (days.length === 0) {
    // 데이터가 아직 로딩 중인 경우 로딩 메시지 출력
    return <span>Loading...</span>;
  }

  return (
      <>
        {/* 현재 등록된 일수 출력 */}
        <h2>현재 일수: {days.length}일</h2>
        {/* Day 추가 버튼: 로딩 중일 때 비활성화 및 텍스트 변경 */}
        <button className="btn_create_day" onClick={addDay} style={
          {
            opacity: isLoading ? 0.3 : 1, // 로딩 중이면 버튼 투명도 조정
          }
        }>
          {isLoading ? "Day 추가 중..." : "Day 추가"} {/* 로딩 상태에 따라 버튼 텍스트 변경 */}
        </button>
      </>
  );
}