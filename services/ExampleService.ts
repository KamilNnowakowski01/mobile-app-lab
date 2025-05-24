import axios from 'axios';

const API_BASE = 'https://jsonplaceholder.typicode.com';

export { ExampleService as jsonPlaceholderService };

const ExampleService = {
  // Posts
  getPosts: (params?: any) => axios.get(`${API_BASE}/posts`, { params }),
  getPost: (id: number) => axios.get(`${API_BASE}/posts/${id}`),
  createPost: (data: any) => axios.post(`${API_BASE}/posts`, data),
  updatePost: (id: number, data: any) => axios.put(`${API_BASE}/posts/${id}`, data),
  patchPost: (id: number, data: any) => axios.patch(`${API_BASE}/posts/${id}`, data),
  deletePost: (id: number) => axios.delete(`${API_BASE}/posts/${id}`),

  // Comments
  getComments: (params?: any) => axios.get(`${API_BASE}/comments`, { params }),
  getComment: (id: number) => axios.get(`${API_BASE}/comments/${id}`),
  createComment: (data: any) => axios.post(`${API_BASE}/comments`, data),
  updateComment: (id: number, data: any) => axios.put(`${API_BASE}/comments/${id}`, data),
  patchComment: (id: number, data: any) => axios.patch(`${API_BASE}/comments/${id}`, data),
  deleteComment: (id: number) => axios.delete(`${API_BASE}/comments/${id}`),

  // Albums
  getAlbums: (params?: any) => axios.get(`${API_BASE}/albums`, { params }),
  getAlbum: (id: number) => axios.get(`${API_BASE}/albums/${id}`),
  createAlbum: (data: any) => axios.post(`${API_BASE}/albums`, data),
  updateAlbum: (id: number, data: any) => axios.put(`${API_BASE}/albums/${id}`, data),
  patchAlbum: (id: number, data: any) => axios.patch(`${API_BASE}/albums/${id}`, data),
  deleteAlbum: (id: number) => axios.delete(`${API_BASE}/albums/${id}`),

  // Photos
  getPhotos: (params?: any) => axios.get(`${API_BASE}/photos`, { params }),
  getPhoto: (id: number) => axios.get(`${API_BASE}/photos/${id}`),

  // Todos
  getTodos: (params?: any) => axios.get(`${API_BASE}/todos`, { params }),
  getTodo: (id: number) => axios.get(`${API_BASE}/todos/${id}`),
  createTodo: (data: any) => axios.post(`${API_BASE}/todos`, data),
  updateTodo: (id: number, data: any) => axios.put(`${API_BASE}/todos/${id}`, data),
  patchTodo: (id: number, data: any) => axios.patch(`${API_BASE}/todos/${id}`, data),
  deleteTodo: (id: number) => axios.delete(`${API_BASE}/todos/${id}`),

  // Users
  getUsers: () => axios.get(`${API_BASE}/users`),
  getUser: (id: number) => axios.get(`${API_BASE}/users/${id}`),
};
