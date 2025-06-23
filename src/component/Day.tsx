// Day.tsx: 선택된 요일(일차)의 단어 목록을 보여주는 컴포넌트
import dummy from "../db/data.json";
import {useParams} from "react-router-dom";

export default function Day() {
  // URL 파라미터에서 day 값을 추출 (예: /day/1 -> day=1)
  const {day} = useParams<{ day: string }>();

  // 선택된 요일에 해당하는 단어 리스트 추출
  // word.day와 URL 파라미터 day를 비교하여 필터링
  const wordList = dummy.words.filter(word => word.day === Number(day));

  return (
      <>
        {/* 선택된 요일(일차) 제목 */}
        <h2>Day {day}</h2>
        {/* 단어 목록 테이블 */}
        <table>
          <tbody>
          {/* 단어 리스트를 테이블 행으로 렌더링 */}
          {wordList.map(word => (
              // 각 단어의 한글/중국어를 행으로 출력
              <tr key={word.id}>
                <td>{word.kor}</td>
                <td>{word.chn}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </>
  );
}