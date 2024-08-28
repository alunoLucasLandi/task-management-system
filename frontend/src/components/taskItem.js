import React, { useState } from 'react';


function TaskItem({ task, onEditTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [titulo, setTitulo] = useState(task.titulo);
  const [descricao, setDescricao] = useState(task.descricao);
  const [data, setData] = useState(task.data);
  const [concluida, setConcluida] = useState(task.concluida);

  const handleSave = () => {
    onEditTask(task.id, { titulo, descricao, data, concluida });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  return (
    <div className={`task-item ${concluida ? 'concluida' : ''}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <div>
            <button
              type="button"
              onClick={() => setData(new Date().toISOString().split('T')[0])}
            >
              Hoje
            </button>
            <button
              type="button"
              onClick={() =>
                setData(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0])
              }
            >
              Amanhã
            </button>
          </div>
          <select
            value={concluida ? 'concluida' : 'pendente'}
            onChange={(e) => setConcluida(e.target.value === 'concluida')}
          >
            <option value="pendente">Pendente</option>
            <option value="concluida">Concluída</option>
          </select>
          <button onClick={handleSave}>Confirmar Edição</button>
        </>
      ) : (
        <>
          <h3>{titulo}</h3>
          <p>{descricao}</p>
          <p>Status: {concluida ? 'Concluída' : 'Pendente'}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={handleDelete}>Excluir</button>
        </>
      )}
    </div>
  );
}

export default TaskItem;
