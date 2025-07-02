import axios from 'axios';
import { Post, Pagination } from '@/types';

const API_URL = 'http://127.0.0.1:8000/api';

export const getPosts = async (page: number = 1): Promise<Pagination> => {
  const response = await axios.get(`${API_URL}/posts`, { params: { page } });
  return response.data.data; 
};

export const getPost = async (id: string): Promise<Post> => {
  const response = await axios.get(`${API_URL}/posts/${id}`);
  return response.data.data;
};

export const createPost = async (data: { title: string; content: string }) => {
  const response = await axios.post(`${API_URL}/posts`, data);
  return response.data.data;
};

export const updatePost = async (id: string, data: { title: string; content: string }) => {
  const response = await axios.put(`${API_URL}/posts/${id}`, data);
  return response.data.data;
};

export const deletePost = async (id: string) => {
  const response = await axios.delete(`${API_URL}/posts/${id}`);
  return response.data;
};