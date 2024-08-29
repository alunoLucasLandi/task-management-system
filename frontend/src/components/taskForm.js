import React, { useState } from 'react';
import '../App.css';

function TaskForm({ onAddTask }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [selectedButton, setSelectedButton] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !descricao || !data) return; // Garante que os campos estejam preenchidos
    await onAddTask({ titulo, descricao, data, concluida: false });
    setTitulo('');
    setDescricao('');
    setSelectedButton('');
  };

  const handleHojeClick = () => {
    const hoje = new Date().toISOString().split('T')[0];
    setData(hoje);
    setSelectedButton('hoje');
  };

  const handleAmanhaClick = () => {
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    const formattedAmanha = amanha.toISOString().split('T')[0];
    setData(formattedAmanha);
    setSelectedButton('amanha');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        placeholder="Título da Tarefa"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <div>
        <button
          type="button"
          onClick={handleHojeClick}
          className={selectedButton === 'hoje' ? 'selected' : ''}
        >
          Hoje
        </button>
        <button
          type="button"
          onClick={handleAmanhaClick}
          className={selectedButton === 'amanha' ? 'selected' : ''}
        >
          Amanhã
        </button>
      </div>
      <button type="submit" disabled={!titulo || !descricao || !data}>
        Adicionar Tarefa
      </button>
    </form>
  );
}

export default TaskForm;
