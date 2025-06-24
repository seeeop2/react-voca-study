// 커스텀 훅: 주어진 URL에서 데이터를 비동기적으로 fetch하여 상태로 관리하고 반환합니다.
// 제네릭 타입 T를 사용하여 다양한 데이터 타입에 대응할 수 있습니다.
import {useEffect, useState} from "react";

/**
 * useFetch<T>
 * @param url 데이터를 가져올 API 또는 리소스의 URL
 * @returns T[] 타입의 데이터 배열 (예: useFetch<IDay>(url) → IDay[])
 * @template T - fetch로 받아올 데이터의 타입
 *
 * 이 훅은 컴포넌트에서 재사용할 수 있는 데이터 패칭 로직을 제공합니다.
 * URL이 변경될 때마다 데이터를 새로 가져오며, 에러 발생 시 콘솔에 로그를 남깁니다.
 */
export default function useFetch<T>(url: string): T[] {
  // data: fetch로 받아온 데이터를 저장하는 상태 (초기값은 빈 배열)
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    // fetch API를 사용해 비동기적으로 데이터 요청
    fetch(url) // 인자로 받은 URL에서 데이터 가져오기
    .then(res => {
      if (!res.ok) { // 응답이 성공적이지 않을 경우 에러 처리
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json(); // 응답을 JSON 객체로 변환
    })
    .then(data => setData(data)) // 변환된 데이터를 상태에 저장
    .catch(error => console.error("데이터를 가져오는 중 오류 발생:", error)); // 오류 발생 시 콘솔에 에러 메시지 출력
  }, [url]); // url이 변경될 때마다 effect 재실행

  return data; // fetch로 받아온 데이터 배열 반환
}
