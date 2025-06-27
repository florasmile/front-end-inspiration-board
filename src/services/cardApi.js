import axios from 'axios';
import { VITE_APP_BACKEND_URL } from './api';

export const postCardApi = async (newCardData, boardId) => {
  const response = await axios.post(`${VITE_APP_BACKEND_URL}/boards/${boardId}/cards`, newCardData);
  return response.data;
};

export const getCardsApi = async (boardId) => {
  const response = await axios.get(`${VITE_APP_BACKEND_URL}/boards/${boardId}/cards`);
  return response.data.cards;
};

export const deleteCardApi = async (cardId) => {
  await axios.delete(`${VITE_APP_BACKEND_URL}/cards/${cardId}`);
};

export const addCardLikesApi = async (cardId) => {
  const response = await axios.patch(`${VITE_APP_BACKEND_URL}/cards/${cardId}/like`);
  return response.data;
}