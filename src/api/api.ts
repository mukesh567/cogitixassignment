import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchEpisodes = async () => {
  const response = await axios.get(`${BASE_URL}/episode`);
  return response.data.results;
};

export const fetchCharactersByEpisode = async (episodeId: number) => {
  const response = await axios.get(`${BASE_URL}/episode/${episodeId}`);
  const characterPromises = response.data.characters.map((url: string) => axios.get(url));
  const characters = await Promise.all(characterPromises);
  return characters.map((char) => char.data);
};

export const fetchInitialCharacters = async () => {
  const response = await axios.get(`${BASE_URL}/character`);
  return response.data.results;
};
