import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ListPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drama, setDrama] = useState(null);
  const [liked, setLiked] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [tab, setTab] = useState('episode');
  const sliderRef = useRef();

  useEffect(() => {
    const fetchDrama = async () => {
      try {
        const res = await fetch(`/dramas/${id}`);
        const data = await res.json();
        setDrama(data);

        // 자동 재생
        const alreadyPlayed = sessionStorage.getItem(`played_${id}`);
        if (!alreadyPlayed && data.episodes?.length > 0) {
          sessionStorage.setItem(`played_${id}`, 'true');
          const firstEpisode = data.episodes.find((ep) => ep.id === 1);
          if (firstEpisode) {
            navigate(`/play/${firstEpisode.id}`, {
              state: {
                episode: firstEpisode,
                episodes: data.episodes,
              },
            });
          }
        }
      } catch (error) {
        console.error('API 호출 실패:', error);
      }
    };

    fetchDrama();
  }, [id, navigate]);

  if (!drama) return <div className="text-white p-6">로딩 중...</div>;

  const { title, description, backgroundImageUrl, episodes = [] } = drama;

  const maxLength = 70;
  const isLong = description.length > maxLength;
  const displayText = showFull || !isLong ? description : description.slice(0, maxLength) + '...';

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8;
      sliderRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div
        className="relative h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
        <div className="absolute bottom-10 left-6 z-10 max-w-3xl">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-sm mt-1">시즌 1개 · <span className="text-yellow-400">15</span>세 · 드라마</p>
          <p className="text-sm mt-2">
            {displayText}{' '}
            {isLong && (
              <button
                className="underline text-blue-400"
                onClick={() => setShowFull(!showFull)}
              >
                {showFull ? '닫기' : '더보기'}
              </button>
            )}
          </p>
          <div className="flex gap-4 mt-4 items-center">
            <button className="bg-blue-600 px-4 py-2 rounded-md text-sm font-semibold">로그인</button>
            <button className="text-lg" onClick={() => setLiked(!liked)}>
              <span className={liked ? 'text-red-500' : 'text-white'}>
                {liked ? '♥' : '♡'} 관심
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 pt-6 border-b border-gray-700">
        <ul className="flex gap-6 text-sm">
          <li
            className={`${tab === 'episode' ? 'border-b-2 border-blue-500' : 'text-gray-400'} pb-2 cursor-pointer`}
            onClick={() => setTab('episode')}
          >
            에피소드
          </li>
          <li
            className={`${tab === 'recommend' ? 'border-b-2 border-blue-500' : 'text-gray-400'} pb-2 cursor-pointer`}
            onClick={() => setTab('recommend')}
          >
            추천
          </li>
        </ul>
      </div>

      <div className="px-6 py-6 space-y-6">
        {tab === 'episode' &&
          episodes.map((ep) => (
            <div
              key={ep.id}
              className="flex gap-4 hover:bg-gray-800 transition-all p-4 rounded cursor-pointer"
              onClick={() =>
                navigate(`/play/${ep.id}`, {
                  state: {
                    episode: ep,
                    episodes,
                  },
                })
              }
            >
              <img
                src={ep.image || 'https://via.placeholder.com/160x90'}
                alt={ep.title}
                className="w-40 h-24 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold mb-1">{ep.title}</h3>
                <p className="text-sm text-gray-400">
                  {ep.broadcastDate
                    ? new Date(ep.broadcastDate).toLocaleDateString()
                    : '방영일 미상'}{' '}
                  · {ep.time || '시간 정보 없음'}
                </p>
                <p className="text-sm mt-1">{ep.episodeDescription}</p>
              </div>
            </div>
          ))}

        {tab === 'recommend' && (
          <>
            <div className="mb-4 text-xl font-bold">화제의 데이브 추천작</div>
            <div className="relative">
              <button
                onClick={() => handleScroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                <FaChevronRight />
              </button>
              <div
                ref={sliderRef}
                className="flex gap-4 overflow-x-auto pr-6 scrollbar-hide [&::-webkit-scrollbar]:hidden"
              >
                {episodes.slice(0, 8).map((ep) => (
                  <div
                    key={ep.id}
                    className="w-60 h-80 flex-shrink-0 overflow-hidden rounded relative cursor-pointer group"
                  >
                    <img
                      src={ep.image || 'https://via.placeholder.com/160x90'}
                      alt={ep.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 block"
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListPage;
