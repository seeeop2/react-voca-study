// DayList.tsx: 요일(일차) 목록을 보여주는 컴포넌트
// 각 요일을 클릭하면 해당 요일의 단어 목록 페이지로 이동
import {Link} from "react-router-dom";
import dummy from "../db/data.json";

// 요일 데이터 타입 정의
interface IDay {
  id: number; // 고유 식별자
  day: number; // 날짜(일차)
}

export default function DayList() {
  // days 데이터: data.json에서 불러온 요일 배열
  const days: IDay[] = dummy.days;

  return (
      <>
        {/* 요일 리스트 전체를 감싸는 ul */}
        <ul className="list_day">
          {days.map(day => (
              // 각 요일 항목(li) 렌더링
              <li key={day.id}>
                {/* 요일 링크: 클릭 시 해당 요일의 단어 목록 페이지로 이동 */}
                <Link to={`/day/${day.day}`}>Day {day.day}</Link>
              </li>
          ))}
        </ul>
      </>
  );
}