import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/taskForm';
import TaskList from './components/taskList';
import { fetchTasks, createTask, editTask, deleteTask } from './components/api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await fetchTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao carregar as tarefas:', error);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const response = await createTask(newTask);
      setTasks([...tasks, response.data]);
      loadTasks(); // Atualiza a lista de tarefas carregadas
    } catch (error) {
      console.error('Erro ao adicionar a tarefa:', error);
    }
  };

  const handleEditTask = async (id, updatedTask) => {
    try {
      const response = await editTask(id, updatedTask);
      setTasks(tasks.map(task => (task.id === id ? response.data : task)));
      loadTasks(); // Atualiza a lista de tarefas carregadas
    } catch (error) {
      console.error('Erro ao editar a tarefa:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
      loadTasks(); // Atualiza a lista de tarefas carregadas
    } catch (error) {
      console.error('Erro ao deletar a tarefa:', error);
    }
  };

  return (
    <div>
      <Header />
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} />
    </div>
  );
}

export default App;
