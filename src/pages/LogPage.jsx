// ✅ LogPage.jsx
import { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const LogPage = () => {
  const { titleId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const logClick = async () => {
      await fetch(`/api/log?titleId=${titleId}`); // optional
      setTimeout(() => {
        navigate(`/list/${titleId}`, {
          state: location.state,
        });
      }, 1000);
    };
    logClick();
  }, [titleId, navigate, location.state]);

  return (
    <div className="text-white text-center mt-40">
      <h1>{titleId} 클릭 기록 중...</h1>
    </div>
  );
};

export default LogPage;
