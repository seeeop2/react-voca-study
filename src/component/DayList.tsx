// DayList 컴포넌트: 요일 목록을 렌더링하는 컴포넌트
import dummy from "../db/data.json";

export interface IDay {
  id: number;
  day: number;
}

export default function DayList() {
  // days 데이터: data.json에서 불러온 요일 배열
  const days: IDay[] = dummy.days;

  return (
      <>
        {/* 요일 리스트 렌더링 */}
        <ul className="list_day">
          {days.map(day => (
              // 각 요일 항목 렌더링
              <li key={day.id}>Day {day.day}</li>
          ))}
        </ul>
      </>
  );
}