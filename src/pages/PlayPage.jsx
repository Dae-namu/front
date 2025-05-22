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
            <img src="https://private-user-images.githubusercontent.com/194181560/446010415-d9c211a1-346d-4f28-a508-e07651a89e53.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDc4MjE1MzMsIm5iZiI6MTc0NzgyMTIzMywicGF0aCI6Ii8xOTQxODE1NjAvNDQ2MDEwNDE1LWQ5YzIxMWExLTM0NmQtNGYyOC1hNTA4LWUwNzY1MWE4OWU1My5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNTIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDUyMVQwOTUzNTNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT02MGUzMWZmY2FjYzVmZGU0M2UxZmEwNmQxODJhZjEzMGFkY2IzNTdlZTY0MjYxMGMyZmQ4ZGNjN2Q4OWJiNDMyJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.iDtldc05hMyPwsjCDYk-ueYDUJdkJgWL0B2pTZkzoCo" alt="뒤로가기" className="w-10 h-10" />
          </button>
        </div>
      )}

      {/* 커스텀 재생 컨트롤 */}
      {showControls && (
        <div className="absolute inset-0 flex items-center justify-center gap-16 z-40 pointer-events-none">
          <button onClick={() => playerRef.current?.rewind(10)} className="pointer-events-auto">
            <img src="https://private-user-images.githubusercontent.com/194181560/446009345-bce42b22-8aa3-47a5-9340-e6dc5d206bc5.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDc4MjE0NDMsIm5iZiI6MTc0NzgyMTE0MywicGF0aCI6Ii8xOTQxODE1NjAvNDQ2MDA5MzQ1LWJjZTQyYjIyLThhYTMtNDdhNS05MzQwLWU2ZGM1ZDIwNmJjNS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNTIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDUyMVQwOTUyMjNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT05ZWIwMzUyNWQ5NWNmYjNkZmFjOTA2MThmZmVjNzgzMDRlNDgyMzE2MjYyMTE0MTcxNjQ4Y2IyNjgyOWRjNTQxJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.-stQz21pAkj31g21OXBkU-B6Q9rFowemz-SbfHHf2g8" alt="10초 뒤로" className="w-12 h-12 opacity-90" />
          </button>
          <button onClick={() => playerRef.current?.togglePlay()} className="pointer-events-auto">
            <img src="https://private-user-images.githubusercontent.com/194181560/446005672-0cafb261-3863-40e5-9997-659c6581ae6a.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDc4MjEzNTYsIm5iZiI6MTc0NzgyMTA1NiwicGF0aCI6Ii8xOTQxODE1NjAvNDQ2MDA1NjcyLTBjYWZiMjYxLTM4NjMtNDBlNS05OTk3LTY1OWM2NTgxYWU2YS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNTIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDUyMVQwOTUwNTZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1iNDA5ZTlkMDkxYTI0MTkyZjQ5ZmJiODIxNzk0MGZlNmY5ZWE5Mjc1OWVhMDJhOWM2ZTE4ZGM2ODFjNDkyMDQ3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.iYWmLmBEGnRa5yx5blVhke5CoX7Zt8rt-BwhddxoDiI" alt="재생" className="w-20 h-20 opacity-90" />
          </button>
          <button onClick={() => playerRef.current?.forward(10)} className="pointer-events-auto">
            <img src="https://private-user-images.githubusercontent.com/194181560/446006148-fcb4594e-d688-4c78-b134-54425d921098.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDc4MjEzNzYsIm5iZiI6MTc0NzgyMTA3NiwicGF0aCI6Ii8xOTQxODE1NjAvNDQ2MDA2MTQ4LWZjYjQ1OTRlLWQ2ODgtNGM3OC1iMTM0LTU0NDI1ZDkyMTA5OC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNTIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDUyMVQwOTUxMTZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xYjA1ZjNlNzQ5ODlkZDhjODViNGFjM2JhMWEwYzk4YTZhZGRlOTE0MzA0NDBkMjdkNzJlNzhiNGZkNGJjODJiJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.nGGpFtk6-KsTLKcriPMnDAKMDfY_Zl8Rla7b5-P-NkA" alt="10초 앞으로" className="w-12 h-12 opacity-90" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayPage;
