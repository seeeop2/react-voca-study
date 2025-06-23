// EmptyPage 컴포넌트: 잘못된 경로 접근 시 보여주는 404 페이지
import {Link} from "react-router-dom";

export default function EmptyPage() {
  return (
      <div className="empty-page">
        {/* 404 에러 메시지 영역 */}
        <h2>페이지를 찾을 수 없습니다.</h2>
        {/* 안내 문구: 사용자가 잘못된 경로로 접근했음을 알림 */}
        <p>요청하신 페이지가 존재하지 않습니다. 다른 페이지로 이동해 주세요.</p>
        {/* 메인 페이지로 이동하는 링크 버튼 */}
        <Link to="/">메인 페이지로 돌아가기</Link>
      </div>
  );
}