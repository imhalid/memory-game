import React from "react";

const SingleCards = ({ card, handleChoice, flippedCards }) => {
  const cardClick = () => {
    handleChoice(card);
  };
  return (
    <div className="card" key={card.id}>
      <div className={flippedCards ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          onClick={cardClick}
          className="back"
          src="/assets/Cover.png"
          alt="card back"
        />
      </div>
    </div>
  );
};

export default SingleCards;
