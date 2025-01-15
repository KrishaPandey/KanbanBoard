// components/Card.jsx
import React from 'react';
import './Card.css'; 

const Card = ({ card, onDelete, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="card" 
    >
      <div className="cardHeader"> 
        <h4 className="cardTitle">{card.title}</h4> 
        <button
          onClick={onDelete}
          className="deleteButton"
          aria-label="Delete card"
        >
          
        </button>
      </div>
      <p className="cardDescription">{card.description}</p> 
    </div>
  );
};

export default Card;
