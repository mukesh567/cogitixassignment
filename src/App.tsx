import React, { useEffect, useState } from 'react';
import { fetchEpisodes, fetchInitialCharacters, fetchCharactersByEpisode } from './api/api';
import EpisodeList from './components/EpisodeList';
import CharacterFeed from './components/CharacterFeed';
import { Character } from './types';
import usePagination from './coustomHook/usePagination';
import './App.css'

const App: React.FC = () => {
  const [episodes, setEpisodes] = useState<{ id: number; name: string }[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 20;

  const {
    currentPage,
    totalPages,
    paginatedData: paginatedCharacters,
    handleNextPage,
    handlePrevPage,
    handlePageClick,
  } = usePagination(characters, itemsPerPage);


  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      const episodesData = await fetchEpisodes();
      setEpisodes(episodesData);
      const initialCharacters = await fetchInitialCharacters();
      setCharacters(initialCharacters);
      setLoading(false);
    };
    loadInitialData();
  }, []);

  const handleEpisodeClick = async (episodeId: number) => {
    setLoading(true);
    setSelectedEpisode((prevEpisode) => (prevEpisode === episodeId ? null : episodeId));
    if (selectedEpisode === episodeId) {
      const initialCharacters = await fetchInitialCharacters();
      setCharacters(initialCharacters);
    } else {
      const allCharacters = await fetchCharactersByEpisode(episodeId);
      setCharacters(allCharacters);
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <EpisodeList
        episodes={episodes}
        selectedEpisode={selectedEpisode}
        onEpisodeClick={handleEpisodeClick}
      />
      {loading ? (
        <p>Loading...Please wait</p>
      ) : (
        <>
          <div className='feed-and-page'>
            <CharacterFeed characters={paginatedCharacters} />
            {characters.length > itemsPerPage && (
              <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={currentPage === index + 1 ? 'active' : ''}
                    onClick={() => handlePageClick(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                  →
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};



export default App;
