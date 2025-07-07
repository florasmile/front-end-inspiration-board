import axios from 'axios';
import { VITE_APP_BACKEND_URL } from './api';

export const getAllBoardsApi = async () => {
  const response = await axios.get(`${VITE_APP_BACKEND_URL}/boards`);
  return response.data;
};

export const postBoardApi = async (newBoardData) => {
  const response = await axios.post(`${VITE_APP_BACKEND_URL}/boards`, newBoardData);
  return response.data;
};

export const deleteBoardApi = async (boardId) => {
  return await axios.delete(`${VITE_APP_BACKEND_URL}/boards/${boardId}`);
};

export const updateBoardApi = async (boardId, newTitle) => {
  return await axios.put(`${VITE_APP_BACKEND_URL}/boards/${boardId}`, { title: newTitle });
};

