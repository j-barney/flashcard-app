import React from "react";
import DeckList from "../deckComponents/DeckList";
import { Link } from "react-router-dom";

function Home({ decks, setDeckLoader, deckLoader }) {
  return (
    <div>
      <div className="container">
        <Link to="/decks/new">
          <button type="button" className="btn btn-primary mx-0 my-3">
            + Create Deck
          </button>
        </Link>
      </div>
      <DeckList decks={decks} setDeckLoader={setDeckLoader} deckLoader={deckLoader} />
    </div>
  );
}

export default Home;
