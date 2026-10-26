const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const request = async (url, options) => {
  const response = await fetch(`${API_URL}${url}`, options);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.status === 204 ? null : response.json();
};

export const fetchTasks = () => request('/tasks');
export const createTask = (title, important) => request('/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, important }) });
export const updateTask = (id, changes) => request(`/tasks/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(changes) });
export const updateTaskStatus = (id, completed) => updateTask(id, { completed });
export const toggleTaskImportance = (id, important) => updateTask(id, { important });
export const deleteTaskFromApi = (id) => request(`/tasks/${id}`, { method: 'DELETE' });
export const fetchScore = () => request('/score');
