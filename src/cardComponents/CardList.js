import React from "react";
import { Link, useParams } from "react-router-dom";
import { deleteCard } from "../utils/api";

function CardList({ deck, setCardLoader, cardLoader }) {
  const { deckId } = useParams();

  const cardDeleteHandler = async (card) => {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      await deleteCard(card.id);
      setCardLoader(!cardLoader)
    }
  };

  return (
    <div className="container">
      {deck.cards.map((card) => (
        <div className="card m-3">
          <div className="card-body">
            <p className="card-text">{card.front}</p>
            <h6 className="card-text ">{card.back}</h6>
            <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
              <button className="btn btn-secondary mr-1">Edit</button>
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => cardDeleteHandler(card)}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// /* TODO:
//         formats display for all cards in selected deck
// */

export default CardList;
