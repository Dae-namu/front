import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { titleId } = useParams();
  const fromLocal = location.state?.fromLocal === true;

  const [liked, setLiked] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [tab, setTab] = useState('episode');
  const sliderRef = useRef();

  useEffect(() => {
    const alreadyPlayed = sessionStorage.getItem(`played_${titleId}`);
    if (fromLocal && !alreadyPlayed) {
      sessionStorage.setItem(`played_${titleId}`, 'true');
      setTimeout(() => navigate('/play/ep1'), 500);
    }
  }, [fromLocal, navigate, titleId]);

  const shortDesc =
    '불멸의 삶을 끝내기 위해 인간 신부가 필요한 도깨비와 저승사자, 그리고 도깨비 신부를 자처하는 소녀의 운명적 로맨스...';
  const fullDesc =
    '불멸의 삶을 끝내기 위해 인간 신부가 필요한 도깨비, 그와 기묘한 동거를 시작한 기억상실증 저승사자. 그런 그들 앞에 \'도깨비 신부\'라 주장하는 \'죽었어야 할 운명\'의 소녀가 나타나며 벌어지는 神비로운 낭만 설화';

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

  
  const teasers = [
    {
      title: '2024 티저 2',
      src: 'https://navertv-cjenm-c.smartmediarep.com/smc/navertv/multi/eng/C01_80631/2f636a656e6d2f434c49502f45412f423132303136313933312f423132303136313933315f455049303030315f31325f7433332e6d7034/0-0-0/content.mp4?solexpire=1747916000&solpathlen=149&soltoken=7f874fb3016b602af174963ddc8030b4&soltokenrule=c29sZXhwaXJlfHNvbHBhdGhsZW58c29sdXVpZA==&soluriver=2&soluuid=3586b02a-0924-407c-8c23-b1b7ee6874ef&itemtypeid=33&tid=d3d2a449-8a45-4de5-b3e7-c2a2a1a85148',
      thumb: 'https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/FZ7SILUQP7HBSPSJNTLXNZNDAE.jpg'
    }
  ];

  const recommendations = [
    'https://image.wavve.com/v1/thumbnails/480_720_20_80/meta/image/202411/1730969986176521229.webp',
    'https://image.wavve.com/v1/thumbnails/480_720_20_80/meta/image/202504/1746000209520850269.webp',
    'https://image.wavve.com/v1/thumbnails/480_720_20_80/meta/image/202505/1746754950390944990.webp',
    'https://image.wavve.com/v1/thumbnails/480_720_20_80/meta/image/202410/1728563706398328256.webp',
    'https://image.wavve.com/v1/thumbnails/480_720_20_80/BMS/TVSeason/2022/S01_P455166222-Vertical_LogoY.webp',
    'https://image.wavve.com/v1/thumbnails/480_720_20_80/meta/image/202411/1730971898240372044.webp',
    'https://image.wavve.com/v1/thumbnails/480_720_20_80/BMS/TVSeason/2022/K02_T2015-0294-Vertical_LogoY.webp',
    'https://image.wavve.com/v1/thumbnails/480_720_20_80/meta/image/202409/1726468505828994516.webp'
  ];

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8;
      sliderRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* 상단 배경 및 정보 */}
      <div className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: 'url(https://blog.kakaocdn.net/dn/V46Al/btsJMxTCqPc/ycNsIKmfKEjkRFYn2nKi61/img.png)' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
        <div className="absolute bottom-10 left-6 z-10 max-w-3xl">
          <h1 className="text-4xl font-bold">도깨비</h1>
          <p className="text-sm mt-1">
            시즌 1개 · <span className="text-yellow-400">15</span>세 · 드라마
          </p>
          <p className="text-sm mt-2">
            {showFull ? fullDesc : shortDesc}{' '}
            <button className="underline text-blue-400" onClick={() => setShowFull(!showFull)}>
              {showFull ? '닫기' : '더보기'}
            </button>
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

      {/* 탭 메뉴 */}
      <div className="px-6 pt-6 border-b border-gray-700">
        <ul className="flex gap-6 text-sm">
          <li className={`${tab === 'episode' ? 'border-b-2 border-blue-500' : 'text-gray-400'} pb-2 cursor-pointer`} onClick={() => setTab('episode')}>에피소드</li>
          <li className={`${tab === 'teaser' ? 'border-b-2 border-blue-500' : 'text-gray-400'} pb-2 cursor-pointer`} onClick={() => setTab('teaser')}>관련영상</li>
          <li className={`${tab === 'recommend' ? 'border-b-2 border-blue-500' : 'text-gray-400'} pb-2 cursor-pointer`} onClick={() => setTab('recommend')}>추천</li>
        </ul>
      </div>

      {/* 본문 컨텐츠 */}
      <div className="px-6 py-6 space-y-6">
        {tab === 'episode' && episodes.map((ep, idx) => (
          <div key={idx} className="flex gap-4 hover:bg-gray-800 transition-all p-4 rounded cursor-pointer">
            <img src={ep.thumb} alt={`ep${idx}`} className="w-40 h-24 object-cover rounded" />
            <div>
              <h3 className="font-semibold mb-1">{`${idx + 1}. ${ep.title}`}</h3>
              <p className="text-sm text-gray-400">{`${ep.date} | ${ep.time}`}</p>
              <p className="text-sm mt-1">{ep.desc}</p>
            </div>
          </div>
        ))}

        {tab === 'teaser' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {teasers.map((teaser, idx) => (
              <div key={idx} className="cursor-pointer hover:scale-105 transition-transform" onClick={() => window.open(teaser.src, '_blank')}>
                <img src={teaser.thumb} alt={`teaser-${idx}`} className="w-full h-56 object-cover rounded" />
                <p className="mt-1 text-sm text-center">{teaser.title}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'recommend' && (
          <>
            <div className="mb-4 text-xl font-bold">화제의 데이브 추천작</div>
            <div className="relative">
              <button onClick={() => handleScroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full">
                <FaChevronLeft />
              </button>
              <button onClick={() => handleScroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full">
                <FaChevronRight />
              </button>
              <div ref={sliderRef} className="flex gap-4 overflow-x-auto pr-6 scrollbar-hide [&::-webkit-scrollbar]:hidden">
                {recommendations.map((url, idx) => (
                  <img key={idx} src={url} alt={`rec-${idx}`} className="w-60 h-80 object-cover rounded flex-shrink-0 hover:scale-105 transition-transform cursor-pointer" />
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
