// Day.tsx: 선택된 요일(일차)의 단어 목록을 보여주는 컴포넌트
// Word 컴포넌트를 이용해 각 단어를 행 단위로 렌더링
import {useParams} from "react-router-dom";
import Word, {IWord} from "./Word";
import useFetch from "../hooks/useFetch";

export default function Day() {
  // URL 파라미터에서 day 값을 추출 (예: /day/1 -> day=1)
  const {day} = useParams<{ day: string }>();

  // 해당 요일(day)에 해당하는 단어 목록을 서버에서 가져옴
  // words: IWord 타입의 배열, useFetch 커스텀 훅 사용
  const words = useFetch<IWord>(`http://localhost:3001/words?day=${day}`);

  // 컴포넌트 렌더링: 요일 제목, 로딩 상태, 단어 목록 테이블
  return (
      <>
        {/* 선택된 요일(일차) 제목 */}
        <h2>Day {day}</h2>

        {/* 단어 데이터가 아직 로딩되지 않은 경우 로딩 메시지 출력 */}
        {words.length === 0 && <span>Loading...</span>}

        {/* 단어 목록 테이블: Word 컴포넌트로 각 단어 행 렌더링 */}
        <table>
          <tbody>
          {/* words 배열의 각 단어를 Word 컴포넌트로 렌더링, key는 단어 id 사용 */}
          {words.map(word => (
              // Word 컴포넌트에 단어 정보 전달
              <Word word={word} key={word.id}/>
          ))}
          </tbody>
        </table>
      </>
  );
}