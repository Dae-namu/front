import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainSlider from './components/MainSlider';
import CardSection from './components/CardSection';

import LogPage from './pages/LogPage';
import ListPage from './pages/ListPage';
import PlayPage from './pages/PlayPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <MainSlider />
            <CardSection />
          </>
        } />
        <Route path="/log/:titleId" element={<ListPage />} />
        <Route path="/list/:titleId" element={<ListPage />} />
        <Route path="/play/:episodeId" element={<PlayPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
