import { useEffect, useRef, useState } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import './PlayPageCustom.css';
import { useNavigate } from 'react-router-dom';

const PlayPage = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const navigate = useNavigate();
  const [showControls, setShowControls] = useState(true);
  const timeoutRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = new Plyr(videoRef.current, {
        controls: [
          'play-large', 'rewind', 'play', 'fast-forward', 'progress',
          'current-time', 'mute', 'volume', 'settings', 'fullscreen'
        ],
        autoplay: true,
        keyboard: { global: true },
        ratio: '16:9',
      });
      playerRef.current = player;

      return () => player.destroy();
    }
  }, []);

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
      >
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
      </video>

      {/* 뒤로가기 버튼 */}
      {showControls && (
        <div className="absolute top-4 left-4 z-50 pointer-events-auto">
          <button onClick={() => navigate(-1)}>
            <img src="https://github.com/rraassa/img/blob/main/back_arrow_icon_transparent.png?raw=true" alt="뒤로가기" className="w-10 h-10" />
          </button>
        </div>
      )}

      {/* 커스텀 재생 컨트롤 */}
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
    </div>
  );
};

export default PlayPage;
