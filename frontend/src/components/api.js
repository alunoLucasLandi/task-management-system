import axios from 'axios';

const API_URL = 'http://localhost:8000/tarefas/';

export const fetchTasks = () => {
  return axios.get(API_URL);
};

export const createTask = (taskData) => {
  return axios.post(`${API_URL}criar/`, taskData);
};

export const editTask = (id, taskData) => {
  return axios.post(`${API_URL}${id}/editar/`, taskData);
};

export const deleteTask = (id) => {
  return axios.delete(`${API_URL}${id}/excluir/`);
};