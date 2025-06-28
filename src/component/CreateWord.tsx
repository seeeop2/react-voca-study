import useFetch from "../hooks/useFetch";
import {IDay} from "./DayList";
import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";

export default function CreateWord() {
  // days: 서버에서 일차(day) 목록을 가져옴
  const days = useFetch<IDay>("http://localhost:3001/days");
  // navigate: 페이지 이동을 위한 함수
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  // 각 입력 필드에 접근하기 위한 ref 생성
  const chnRef = useRef(null);
  const korRef = useRef(null);
  const dayRef = useRef(null);

  // 폼 제출 시 호출되는 함수
  function onSubmit(e: React.FormEvent) {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    if (!isLoading) {
      setIsLoading(true); // 저장 요청 중임을 표시

      // 입력값 콘솔 출력 (디버깅용)
      console.log((chnRef.current as HTMLInputElement | null)?.value); // 중국어 단어
      console.log((korRef.current as HTMLInputElement | null)?.value); // 한글 뜻
      console.log((dayRef.current as HTMLInputElement | null)?.value); // 선택된 일차

      // 단어 정보를 서버에 POST 요청으로 저장
      fetch(`http://localhost:3001/words`, {
        method: "POST", // HTTP 메서드: POST
        headers: {
          "Content-Type": "application/json" // 요청 본문 타입: JSON
        },
        body: JSON.stringify({
          day: (dayRef.current as HTMLInputElement | null)?.value, // 선택된 일차
          chn: (chnRef.current as HTMLInputElement | null)?.value, // 중국어 단어
          kor: (korRef.current as HTMLInputElement | null)?.value, // 한글 뜻
          isDone: false, // 새 단어는 기본적으로 학습 완료 상태가 false
        }),
      })
      .then(response => {
        if (response.ok) {
          alert("단어가 저장되었습니다."); // 저장 성공 시 알림
          // 저장 후 해당 일차 페이지로 이동
          navigate(`/day/${(dayRef.current as HTMLInputElement | null)?.value}`);
          setIsLoading(false); // 로딩 상태 해제
        } else {
          console.error("단어 저장 실패:", response.statusText); // 저장 실패 시 에러 출력
        }
      });
    }
  }

  return (
      <>
        {/* 단어 생성 폼 */}
        <form onSubmit={onSubmit}>
          <div className="input_area">
            {/* 중국어 단어 입력 필드 */}
            <label>Chn</label>
            <input type="text" name="chn" ref={chnRef} placeholder="중국어 단어를 입력하세요"/>
          </div>
          <div className="input_area">
            {/* 한글 뜻 입력 필드 */}
            <label>Kor</label>
            <input type="text" name="kor" ref={korRef} placeholder="한글 뜻을 입력하세요"/>
          </div>
          <div className="input_area">
            {/* 일차 선택 드롭다운 */}
            <label>Day</label>
            <select ref={dayRef}>
              {days.map(day => (
                      <option key={day.id} value={day.day}>{day.day}</option>
                  )
              )}
            </select>
          </div>
          {/* 저장 버튼 */}
          <button style={
            {
              opacity: isLoading ? 0.3 : 1,
            }
          }>
            {isLoading ? "저장 중..." : "저장"}
          </button>
        </form>
      </>
  );
}