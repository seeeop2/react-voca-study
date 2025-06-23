// Word.tsx: 단어 정보를 행 단위로 보여주는 컴포넌트
import React from "react";

// 단어 데이터 타입 정의
interface IWord {
  id: number;      // 단어 고유 ID
  day: number;    // 해당 일차 번호
  chn: string;    // 중국어 단어
  kor: string;    // 한글 뜻
  isDone: boolean;// 학습 완료 여부
}

// Word 컴포넌트: 단어 1개를 테이블 행으로 렌더링
export default function Word({word}: { word: IWord }) {
  // 뜻(한글) 표시 여부 상태
  const [isShow, setIsShow] = React.useState(false);
  // 학습 완료 상태
  const [isDone, setIsDone] = React.useState(word.isDone);

  // 뜻(한글) 표시/숨김 토글 함수
  function toggleShow() {
    setIsShow(!isShow);
  }

  // 학습 완료 상태 토글 함수
  function toggleDone() {
    setIsDone(!isDone);
  }

  return (
      <>
        {/*각 단어의 한글/중국어를 행으로 출력*/}
        <tr className={word.isDone ? "off" : ""}>
          <td><input type="checkbox" checked={isDone} onChange={toggleDone}/></td>
          <td>{word.chn}</td>
          <td>{isShow && word.kor}</td>
          <td>
            <button onClick={toggleShow}>뜻 {isShow ? "숨기기" : "보기"}</button>
            <button className="btn_del">삭제</button>
          </td>
        </tr>
      </>
  );
}