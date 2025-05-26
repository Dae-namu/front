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
  const [showEpisodeList, setShowEpisodeList] = useState(false);
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

  const episodes = [
    { title: '도깨비 1화', desc: '도깨비와의 첫 만남...', time: '1시간 10분', date: '2016.12.02', thumb: 'https://image.tving.com/ntgs/contents/CTC/caie/CAIE0400/com/20161125/E001149209.jpg/dims/resize/F_webp,600' },
    { title: '도깨비 2화', desc: '써니의 전생을 알게 된 저승사자...', time: '77분', date: '2016.12.03', thumb: 'https://image.tving.com/ntgs/contents/CTC/caie/CAIE0400/com/20161126/E001149588.jpg/dims/resize/F_webp,600' },
    { title: '도깨비 3화', desc: '도깨비와 저승사자의 과거...', time: '82분', date: '2016.12.09', thumb: 'https://image.tving.com/ntgs/contents/CTC/caie/CAIE0400/com/20161202/E001151536.jpg/dims/resize/F_webp,600' },
    { title: '도깨비 4화', desc: '도깨비 신부로 밝혀진 은탁...', time: '62분', date: '2016.12.10', thumb: 'https://image.tving.com/ntgs/contents/CTC/caie/CAIE0400/com/20161203/E001152116.jpg/dims/resize/F_webp,600' },
    { title: '도깨비 5화', desc: '은탁의 입성...', time: '67분', date: '2016.12.16', thumb: 'https://image.tving.com/ntgs/contents/CTC/caie/CAIE0400/com/20161209/E001153946.jpg/dims/resize/F_webp,600' },
    { title: '도깨비 6화', desc: '10년 후를 본 도깨비...', time: '76분', date: '2016.12.17', thumb: 'https://image.tving.com/ntgs/contents/CTC/caie/CAIE0400/com/20161210/E001154453.jpg/dims/resize/F_webp,600' },
    { title: '도깨비 7화', desc: '살아돌아온 도깨비의 파장...', time: '74분', date: '2016.12.23', thumb: 'https://image.tving.com/ntgs/contents/CTC/caie/CAIE0400/com/20161216/E001156284.jpg/dims/resize/F_webp,600' },
    { title: '도깨비 8화', desc: '은탁의 감정과 도깨비의 고민...', time: '73분', date: '2016.12.24', thumb: 'https://image.tving.com/ntgs/contents/CTC/caie/CAIE0400/com/20161217/E001156862.jpg/dims/resize/F_webp,600' },
    { title: '도깨비 9화', desc: '도깨비 검의 비밀...', time: '78분', date: '2016.12.30', thumb: 'https://image.tving.com/ntgs/contents/CTC/caie/CAIE0400/com/20161223/E001158452.jpg/dims/resize/F_webp,600' },
    { title: '도깨비 10화', desc: '써니의 정체에 대한 충격...', time: '76분', date: '2016.12.31', thumb: 'https://image.tving.com/ntgs/contents/CTC/caie/CAIE0400/com/20161224/E001158878.jpg/dims/resize/F_webp,600' },
    { title: '도깨비 11화', desc: '도깨비의 과거와 써니의 연결...', time: '74분', date: '2017.01.06', thumb: 'https://image.tving.com/ntgs/contents/CTC/caie/CAIE0400/com/20161230/E001160757.jpg/dims/resize/F_webp,600' },
    { title: '도깨비 12화', desc: '박중헌의 위협...', time: '83분', date: '2017.01.07', thumb: 'https://image.tving.com/ntgs/contents/CTC/caie/CAIE0400/com/20161231/E001161016.jpg/dims/resize/F_webp,600' },
    { title: '도깨비 13화', desc: '왕여의 기억과 도깨비의 고통...', time: '85분', date: '2017.01.13', thumb: 'https://image.tving.com/ntgs/contents/CTC/caie/CAIE0400/com/20170106/E001163144.jpg/dims/resize/F_webp,600' },
    { title: '도깨비 14화', desc: '검을 뽑고 소멸을 택한 도깨비...', time: '75분', date: '2017.01.20', thumb: 'https://image.tving.com/ntgs/contents/CTC/caie/CAIE0400/com/20170107/E001163570.jpg/dims/resize/F_webp,600' },
    { title: '도깨비 15화', desc: '기억을 되찾는 은탁...', time: '63분', date: '2017.01.21', thumb: 'https://image.tving.com/ntgs/contents/CTC/caie/CAIE0400/com/20170114/E001165755.jpg/dims/resize/F_webp,600' },
    { title: '도깨비 16화', desc: '마지막 이야기, 재회의 기적...', time: '73분', date: '2017.01.21', thumb: 'https://image.tving.com/ntgs/contents/CTC/caie/CAIE0400/com/20170114/E001165756.jpg/dims/resize/F_webp,600' },
  ];

  return (
    <div
      ref={wrapperRef}
      className="bg-black w-screen h-[calc(100vh-4rem)] flex justify-center items-center overflow-hidden relative"
    >
      {/* 🎥 영상은 고정 */}
      <video
        ref={videoRef}
        className="plyr plyr--full-ui w-full h-full object-contain"
        controls
        playsInline
      >
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
      </video>

      {/* 🔙 뒤로가기 */}
      {showControls && (
        <div className="absolute top-4 left-4 z-50 pointer-events-auto">
          <button onClick={() => navigate(-1)}>
            <img src="https://github.com/rraassa/img/blob/main/back_arrow_icon_transparent.png?raw=true" alt="뒤로가기" className="w-10 h-10" />
          </button>
        </div>
      )}

      {/* 📺 에피소드 목록 열기 */}
      {showControls && (
        <div className="absolute top-4 right-4 z-50 pointer-events-auto">
          <button onClick={() => setShowEpisodeList(true)}>
            <img src="https://github.com/rraassa/img/blob/main/%EB%AA%A9%EB%A1%9D3.png?raw=true" alt="에피소드 목록" className="w-10 h-10" />
          </button>
        </div>
      )}

      {/* ▶️ 커스텀 컨트롤 (비활성화 가능) */}
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

      {/* 📃 에피소드 목록 패널 (보기 전용) */}
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
                className="flex gap-4 py-4 border-b border-gray-700 hover:bg-gray-800 rounded"
              >
                <img src={ep.thumb} alt={ep.title} className="w-32 h-20 object-cover rounded" />
                <div className="flex flex-col justify-center text-sm">
                  <div className="font-semibold text-base">{ep.title}</div>
                  <div className="text-gray-400">{ep.date} · {ep.time}</div>
                  <div className="text-gray-300 line-clamp-2">{ep.desc}</div>
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