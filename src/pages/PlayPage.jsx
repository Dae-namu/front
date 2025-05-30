import { useEffect, useRef, useState } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import './PlayPageCustom.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const PlayPage = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { episodeId } = useParams();
  const [showControls, setShowControls] = useState(true);
  const [showEpisodeList, setShowEpisodeList] = useState(false);
  const timeoutRef = useRef(null);
  const wrapperRef = useRef(null);

  const {
    title = '제목 없음',
    episodes = [],
  } = location.state || {};

  // 현재 에피소드 찾기
  const currentEpisode = episodes.find(ep => String(ep.id) === episodeId) || {};
  const {
    title: episodeTitle = '에피소드 제목 없음',
    streamUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  } = currentEpisode;

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    playerRef.current?.destroy(); // 기존 플레이어 제거

    // src 직접 설정 (DOM 재생성 방지)
    video.src = streamUrl;

    // 플레이어 설정 및 자동 재생
    setTimeout(() => {
      const player = new Plyr(video, {
        controls: [
          'play-large', 'rewind', 'play', 'fast-forward', 'progress',
          'current-time', 'mute', 'volume', 'settings', 'fullscreen'
        ],
        autoplay: true,
        muted: true,
        keyboard: { global: true },
        ratio: '16:9',
      });

      playerRef.current = player;

      player.play().catch(err => {
        console.warn('자동 재생 실패:', err);
      });
    }, 100);

    return () => {
      playerRef.current?.destroy();
    };
  }, [streamUrl]);

  const resetTimer = () => {
    setShowControls(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowControls(false), 2000);
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('mousemove', resetTimer);
      resetTimer();
    }
    return () => {
      if (wrapper) wrapper.removeEventListener('mousemove', resetTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="bg-black w-screen h-[calc(100vh-4rem)] flex justify-center items-center overflow-hidden relative"
    >
      <video
        ref={videoRef}
        className="plyr plyr--full-ui w-full h-full object-contain"
        controls
        playsInline
        autoPlay
      />

      {showControls && (
        <div className="absolute top-4 left-4 z-50 pointer-events-auto">
          <button onClick={() => navigate(-1)}>
            <img src="https://github.com/rraassa/img/blob/main/back_arrow_icon_transparent.png?raw=true" alt="뒤로가기" className="w-10 h-10" />
          </button>
        </div>
      )}

      {showControls && (
        <div className="absolute top-4 right-4 z-50 pointer-events-auto">
          <button onClick={() => setShowEpisodeList(true)}>
            <img src="https://github.com/rraassa/img/blob/main/%EB%AA%A9%EB%A1%9D3.png?raw=true" alt="에피소드 목록" className="w-10 h-10" />
          </button>
        </div>
      )}

      {showControls && (
        <div className="absolute inset-0 flex items-center justify-center gap-16 z-40 pointer-events-none">
          <button onClick={() => playerRef.current?.rewind(10)} className="pointer-events-auto">
            <img src="https://github.com/rraassa/img/blob/main/ChatGPT%20Image%202025%EB%85%84%205%EC%9B%94%2021%EC%9D%BC%20%EC%98%A4%ED%9B%84%2006_30_29.png?raw=true" alt="10초 뒤로" className="w-12 h-12 opacity-90" />
          </button>
          <button onClick={() => playerRef.current?.togglePlay()} className="pointer-events-auto">
            <img src="https://github.com/rraassa/img/blob/main/ChatGPT%20Image%202025%EB%85%84%205%EC%9B%94%2021%EC%9D%BC%20%EC%98%A4%ED%9B%84%2006_21_50.png?raw=true" alt="재생" className="w-20 h-20 opacity-90" />
          </button>
          <button onClick={() => playerRef.current?.forward(10)} className="pointer-events-auto">
            <img src="https://github.com/rraassa/img/blob/main/ChatGPT%20Image%202025%EB%85%84%205%EC%9B%94%2021%EC%9D%BC%20%EC%98%A4%ED%9B%84%2006_23_08.png?raw=true" alt="10초 앞으로" className="w-12 h-12 opacity-90" />
          </button>
        </div>
      )}

      {showEpisodeList && (
        <div className="absolute top-0 right-0 w-[30%] h-full bg-black text-white z-50 overflow-y-auto shadow-lg">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
            <h2 className="text-lg font-bold">에피소드</h2>
            <button onClick={() => setShowEpisodeList(false)} className="text-2xl">×</button>
          </div>

          <div className="px-4">
            {episodes.map((ep, idx) => (
              <div
                key={idx}
                className="flex gap-4 py-4 border-b border-gray-700 hover:bg-gray-800 rounded cursor-pointer"
                onClick={() => navigate(`/play/${ep.id}`, {
                  state: {
                    title,
                    episodes
                  }
                })}
              >
                <img src={ep.image || 'https://via.placeholder.com/160x90'} alt={ep.title} className="w-32 h-20 object-cover rounded" />
                <div className="flex flex-col justify-center text-sm">
                  <div className="font-semibold text-base">{ep.title}</div>
                  <div className="text-gray-400">{ep.broadcastDate} · {ep.time}</div>
                  <div className="text-gray-300 line-clamp-2">{ep.episodeDescription}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayPage;
