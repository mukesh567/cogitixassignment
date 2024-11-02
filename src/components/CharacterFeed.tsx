import React from 'react';
import { Character } from '../types';

interface CharacterFeedProps {
  characters: Character[];
}

const CharacterFeed: React.FC<CharacterFeedProps> = ({ characters }) => {
  return (
    <main className="character-feed">
      {characters.map((character) => (
        <div key={character.id} className="character-card">
          <img src={character.image} alt={character.name} /> 
          <p>{character.name}</p>
        </div>
      ))}
    </main>
  );
};

export default CharacterFeed;
