// ✅ LogPage.jsx
import { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const LogPage = () => {
  const { titleId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const logClick = async () => {
      const state = location.state;
      if (!state || !state.episodes || state.episodes.length === 0) {
        console.warn('에피소드 정보가 없습니다. 바로 PlayPage로 이동합니다.');
        navigate(`/play/1`, { state: { streamUrl: '' } });
        return;
      }

      const firstEpisode = state.episodes.find((ep) => ep.id === 1);
      const streamUrl = firstEpisode?.streamUrl || '';

      await fetch(`/api/log?titleId=${titleId}`); // optional logging

      setTimeout(() => {
        navigate(`/list/${titleId}`, {
          state: {
            ...state,
            streamUrl,
          },
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
