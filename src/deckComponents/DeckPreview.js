import React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeckPreview({ deck }) {
  const cards = deck.cards;
  const history = useHistory();
  //     const confirmBox = async () => {
  //         if (
  //           confirm("Delete this deck?\nYou will not be able to recover it.") == true
  //         ) {
  //           await deleteDeck(deck.Id);
  //         }
  //       };

  const deleteHandler = async () => {
    if (
      (confirm = window.confirm(
        "Delete this deck?\n\nYou will not be able to recover it."
      ))
    ) {
      await deleteDeck(deck.id);
      window.location.reload(true);
    }
  };

  return (
    <div className="card w-75">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{deck.name}</h5>
          <p className="text-secondary text-right">{cards.length} cards</p>
        </div>

        <p className="card-text">{deck.description}</p>
        <div className="d-flex justify-content-start">
          <Link to={`/decks/${deck.id}`}>
            <button type="button" className="btn btn-secondary mr-2">
              View
            </button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button type="button" className="btn btn-primary">
              Study
            </button>
          </Link>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-danger"
            type="button"
            onClick={deleteHandler}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeckPreview;
