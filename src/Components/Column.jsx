// components/Column.jsx
import React from 'react';
import Card from './Card';
import './Column.css'; // Import the CSS file

const Column = ({ column, onDragOver, onDrop, onAddCard, onDeleteCard, onDragStart }) => {
  return (
    <div
      className="column" // Use the className instead of inline style
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="columnHeader"> {/* Use className instead of inline style */}
        <h3 className="columnTitle">{column.title}</h3> {/* Use className */}
        <button
          onClick={onAddCard}
          className="addButton" // Use className
          aria-label={`Add card to ${column.title}`}
        >
          +
        </button>
      </div>

      <div className="cardContainer"> {/* Use className */}
        {column.cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onDelete={() => onDeleteCard(card.id)}
            onDragStart={(e) => onDragStart(e, card.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
