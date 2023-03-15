import React, { useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";

function CardView({ deck }) {
  const [index, setIndex] = useState(0);
  const [onFront, setOnFront] = useState(true);
  const history = useHistory();
  const { deckId } = useParams();

  const flipHandler = (event) => {
    event.preventDefault();
    if (index < deck.cards.length) {
      if (onFront === false) {
        setOnFront(true);
      } else {
        setOnFront(false);
      }
    }
  };
  const nextHandler = (event) => {
    event.preventDefault();
    if (index < deck.cards.length -1 ) {
        setIndex(index + 1);
        setOnFront(true);
      
    } else {
      if (
        window.confirm(
          "Restart cards? \n\n Click 'cancel' to return to the home page."
        )
      ) {
        setIndex(0);
        setOnFront(true);
      } else {
        history.push("/");
      }
    }
  };

  // //if there are at least 3 cards in the deck, displays card and buttons

  
  // //if there are less than 3 cards in the deck, displays message and button to add cards

  if (deck.cards.length > 2) {
    return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          Card {index + 1} of {deck.cards.length}
        </h5>
        {onFront === false ? (
          <p className="card-subtitle mb-2 text-muted">
            {deck.cards[index].back}
          </p>
        ) : (
          <p className="card-subtitle mb-2 text-muted">
            {deck.cards[index].front}
          </p>
        )}
        {onFront === false ? (
          <div className="btn-toolbar">
            <button
              className="btn btn-secondary mx-1"
              name="flipBtn"
              onClick={flipHandler}
            >
              Flip
            </button>
            <button
              className="btn btn-primary mx-1"
              name="nextBtn"
              onClick={nextHandler}
            >
              Next
            </button>
          </div>
        ) : (
          <button
            className="btn btn-secondary mx-1"
            type="button"
            name="flipBtn"
            onClick={flipHandler}
          >
            Flip
          </button>
        )}
      </div>
    </div>
  );
        } else {
          return (
            <div>
              <h3>Not enough cards.</h3>
              <p>
                You need at least 3 cards to study. There are {deck.cards.length + 1}
                cards in this deck.
              </p>
              <Link to={`/decks/${deckId}/cards/new`}>
                <button className="btn btn-primary">+ Add Cards</button>
              </Link>
            </div>
          );
        }
}
// }

export default CardView;
