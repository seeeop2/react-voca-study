// Day.tsx: 선택된 요일(일차)의 단어 목록을 보여주는 컴포넌트
// Word 컴포넌트를 이용해 각 단어를 행 단위로 렌더링
import {useParams} from "react-router-dom";
import Word, {IWord} from "./Word";
import {useEffect, useState} from "react";

export default function Day() {
  // URL 파라미터에서 day 값을 추출 (예: /day/1 -> day=1)
  const {day} = useParams<{ day: string }>();

  // 단어 목록 상태: 해당 요일의 단어 리스트를 저장
  const [words, setWords] = useState<IWord[]>([]);

  // 컴포넌트 마운트 및 day 변경 시, API에서 단어 데이터 fetch
  useEffect(() => {
    fetch(`http://localhost:3001/words?day=${day}`) // API에서 해당 요일의 단어 데이터 가져오기
    .then(response => response.json()) // 응답을 JSON으로 변환
    .then(data => setWords(data)) // 가져온 데이터를 상태에 저장
  }, [day]);

  // 렌더링: 요일 제목과 단어 목록 테이블
  return (
      <>
        {/* 선택된 요일(일차) 제목 */}
        <h2>Day {day}</h2>
        {/* 단어 목록 테이블: Word 컴포넌트로 각 단어 행 렌더링 */}
        <table>
          <tbody>
          {/* 단어 리스트를 Word 컴포넌트로 출력 */}
          {words.map(word => (
              // Word 컴포넌트에 단어 정보 전달
              <Word word={word} key={word.id}/>
          ))}
          </tbody>
        </table>
      </>
  );
}