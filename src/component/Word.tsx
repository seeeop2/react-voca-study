// Word.tsx: 단어 정보를 행 단위로 보여주는 컴포넌트
// - 단어의 중국어, 한글 뜻, 학습 완료 상태를 표시
// - 뜻 보기/숨기기, 학습 완료 토글, 삭제 버튼 제공
import React from "react";

// 단어 데이터 타입 정의
export interface IWord {
  id: string;      // 단어 고유 ID
  day: number;    // 해당 일차 번호
  chn: string;    // 중국어 단어
  kor: string;    // 한글 뜻
  isDone: boolean;// 학습 완료 여부
}

// Word 컴포넌트: 단어 1개를 테이블 행으로 렌더링
export default function Word({word: w}: { word: IWord }) {
  // 단어 상태 (props로 받은 단어 정보를 로컬 상태로 관리)
  const [word, setWord] = React.useState<IWord>(w);
  // 뜻(한글) 표시 여부 상태 (false: 숨김, true: 표시)
  const [isShow, setIsShow] = React.useState(false);
  // 학습 완료 상태 (체크박스와 연동)
  const [isDone, setIsDone] = React.useState(word.isDone);

  // 뜻(한글) 표시/숨김 토글 함수
  const toggleShow = () => setIsShow(!isShow);

  // 학습 완료 상태를 토글하고 서버에 업데이트 요청을 보내는 함수
  function toggleDone() {
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...word,         // 기존 단어 정보를 유지하면서
        isDone: !isDone, // isDone 상태만 현재 값의 반대로 변경하여 전송
      })
    })
    .then(response => {
      if (response.ok) {
        setIsDone(!isDone); // 클라이언트 UI의 isDone 상태도 업데이트하여 즉시 반영
      }
    })
    .catch(error => {
      // 에러 발생 시 콘솔에 출력
      console.error("Error updating word:", error);
    })
  }

  // 단어를 삭제하고 서버에 DELETE 요청을 보내는 함수
  function del() {
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(response => {
      if (response.ok) {
        // 단어의 id를 "0"으로 설정하여 이 컴포넌트가 렌더링되지 않도록 합니다.
        // 이는 UI에서 해당 단어 행을 즉시 제거하는 효과를 줍니다.
        setWord({
          ...word,
          id: "0"
        })
      }
    })
    .catch(error => {
      console.error("Error updating word:", error);
    })
  }

  // word.id가 "0"인 경우 (즉, 삭제된 단어인 경우) null을 반환하여 컴포넌트를 렌더링하지 않습니다.
  // 이는 삭제된 단어가 화면에 더 이상 보이지 않도록 하는 효율적인 방법입니다.
  if (word.id === "0") return null;

  return (
      <>
        {/*각 단어의 한글/중국어를 행으로 출력*/}
        <tr className={isDone ? "off" : ""}>
          <td><input type="checkbox" checked={isDone} onChange={toggleDone}/></td>
          <td>{word.chn}</td>
          <td>{isShow && word.kor}</td>
          <td>
            <button onClick={toggleShow}>뜻 {isShow ? "숨기기" : "보기"}</button>
            <button onClick={del} className="btn_del">삭제</button>
          </td>
        </tr>
      </>
  );
}