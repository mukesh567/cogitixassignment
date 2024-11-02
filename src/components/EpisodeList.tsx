import React from 'react';

interface EpisodeListProps {
  episodes: { id: number; name: string }[];
  selectedEpisode: number | null;
  onEpisodeClick: (episodeId: number) => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes, selectedEpisode, onEpisodeClick }) => {
  return (
    <aside className="episode-list">
      {episodes.length != 0 && <h2>Episodes</h2>} 
      <ul>
        {episodes.map((episode) => (
          <li
            key={episode.id}
            className={selectedEpisode === episode.id ? 'selected' : ''}
            onClick={() => onEpisodeClick(episode.id)}
          >
            {episode.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default EpisodeList;
