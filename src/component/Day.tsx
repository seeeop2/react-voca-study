// Day 컴포넌트: 특정 요일의 단어 목록을 테이블로 렌더링
import dummy from "../db/data.json";

export default function Day() {
  // 현재 선택된 요일 (예시: 1일차)
  const day = 1;
  // 선택된 요일에 해당하는 단어 리스트 추출
  const wordList = dummy.words.filter(word => word.day === day);

  return (
      <>
        <table>
          <tbody>
          {/* 단어 리스트를 테이블 행으로 렌더링 */}
          {wordList.map(word => (
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