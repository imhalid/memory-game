import Head from "next/head";
import { useState, useEffect } from "react";
import SingleCards from "../components/SingleCards";

const cardImages = [
  { src: "/assets/A.png", matched: false },
  { src: "/assets/B.png", matched: false },
  { src: "/assets/C.png", matched: false },
  { src: "/assets/D.png", matched: false },
  { src: "/assets/E.png", matched: false },
  { src: "/assets/F.png", matched: false },
];

export default function Home() {
  // shuffle cards
  // const shuffledCards = cardImages.sort(() => Math.random() - 0.5);

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffleCards);
    setFlipped(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // reset choices & increment flipped
  const resetFlip = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setFlipped((prevFlipped) => prevFlipped + 1);
  };

  // check if the two choices match
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      } else {
        setTimeout(() => resetFlip(), 1000);
      }
      setChoiceOne(null);
      setChoiceTwo(null);
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">Shuffle the Cards</h1>
        <button className="newGame" onClick={shuffleCards}>
          New Game
        </button>

        <div className="card-grid">
          {cards.map((card) => (
            <SingleCards
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flippedCards={
                card === choiceOne || card === choiceTwo || card.matched
              }
            />
          ))}
        </div>
      </main>
    </div>
  );
}
