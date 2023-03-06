import React from "react";
import Header from "./Header";
import DeckList from "../deckComponents/DeckList";
import { Route, Link } from "react-router-dom";

function Home({ decks }) {
  return (
    <div>
      <div className="container">
        <Link to="/decks/new">
          <button type="button" className="btn btn-primary mx-0 my-3">
            + Create Deck
          </button>
        </Link>
      </div>
      <DeckList decks={decks} />
    </div>
  );
}

export default Home;
