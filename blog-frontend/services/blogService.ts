import axios, { AxiosInstance } from 'axios';
import { BlogPost } from '../types/blogTypes';

const API_BASE_URL = 'http://10.151.52.117:3000/api';
// const API_BASE_URL = 'http://localhost:3000/api' 
// const API_BASE_URL = 'http://10.185.212.117:3000/api'

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export type CreatePostDto = Partial<BlogPost>;
export type UpdatePostDto = Partial<BlogPost>;

export const blogService = {

  async getPosts(): Promise<BlogPost[]> {
    const response = await api.get<BlogPost[]>('/posts');
    return response.data;
  },

  async getPost(id: string): Promise<BlogPost> {
    const response = await api.get<BlogPost>(`/posts/${id}`);
    return response.data;
  },

  async createPost(postData: CreatePostDto): Promise<BlogPost> {
    const response = await api.post<BlogPost>('/posts', postData);
    return response.data;
  },

  async updatePost(id: string, postData: UpdatePostDto): Promise<BlogPost> {
    const response = await api.put<BlogPost>(`/posts/${id}`, postData);
    return response.data;
  },

  async deletePost(id: string): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>(`/posts/${id}`);
    return response.data;
  },
};
