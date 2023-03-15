import React from "react";
import DeckPreview from "./DeckPreview";

function DeckList({ decks, setDeckLoader, deckLoader }) {
  return (
    <div>
      {decks.map((deck, index) => (
        <DeckPreview deck={deck} setDeckLoader={setDeckLoader} deckLoader={deckLoader} />
      ))}
    </div>
  );
}

export default DeckList;

/* TODO: displays all current decks✓*/
