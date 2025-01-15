import React, { useState, useEffect } from 'react';
import Column from './Column';
import Search from './Search';
import './KanbanBoard.css'; 

const initialColumns = {
  todo: {
    id: 'todo',
    title: 'To Do',
    cards: [
      { id: '1', title: 'Build Project', description: 'Create a portfolio project' },
      { id: '2', title: 'Build PortFolio', description: 'Build a Portfolio'
      }
    ]
  },
  inProgress: {
    id: 'inProgress',
    title: 'In Progress',
    cards: [
      { id: '2', title: 'Learn Advance React ', description: 'Become a pro in react' }
    ]
  },
  done: {
    id: 'done',
    title: 'Done',
    cards: [
      { id: '3', title: 'Practice React', description: 'Practice React ' }
    ]
  }
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    const savedColumns = localStorage.getItem('kanbanColumns');
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kanbanColumns', JSON.stringify(columns));
  }, [columns]);

  const handleDragStart = (e, cardId, sourceColumnId) => {
    setDraggedItem({ cardId, sourceColumnId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    if (!draggedItem) return;

    const { cardId, sourceColumnId } = draggedItem;
    if (sourceColumnId === targetColumnId) return;

    const sourceCards = [...columns[sourceColumnId].cards];
    const targetCards = [...columns[targetColumnId].cards];
    
    const [movedCard] = sourceCards.filter(card => card.id === cardId);
    const newSourceCards = sourceCards.filter(card => card.id !== cardId);

    setColumns({
      ...columns,
      [sourceColumnId]: {
        ...columns[sourceColumnId],
        cards: newSourceCards
      },
      [targetColumnId]: {
        ...columns[targetColumnId],
        cards: [...targetCards, movedCard]
      }
    });

    setDraggedItem(null);
  };

  const addNewCard = (columnId) => {
    const newCard = {
      id: Date.now().toString(),
      title: 'New Task',
      description: 'Click to edit'
    };

    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        cards: [...columns[columnId].cards, newCard]
      }
    });
  };

  const deleteCard = (columnId, cardId) => {
    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        cards: columns[columnId].cards.filter(card => card.id !== cardId)
      }
    });
  };

  const filteredColumns = Object.entries(columns).reduce((acc, [columnId, column]) => {
    const filteredCards = column.cards.filter(card =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return {
      ...acc,
      [columnId]: { ...column, cards: filteredCards }
    };
  }, {});

  return (
    <div className="container">
      <Search 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="boardContainer">
        {Object.values(filteredColumns).map(column => (
          <Column
            key={column.id}
            column={column}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
            onAddCard={() => addNewCard(column.id)}
            onDeleteCard={(cardId) => deleteCard(column.id, cardId)}
            onDragStart={(e, cardId) => handleDragStart(e, cardId, column.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
