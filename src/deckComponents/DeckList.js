import React from "react";
import { listDecks } from "../utils/api";
import DeckPreview from "./DeckPreview";

function DeckList({ decks }) {
  return (
    <div>
      {decks.map((deck, index) => (
        <DeckPreview deck={deck} />
      ))}
    </div>
  );
}

export default DeckList;

/* TODO: displays all current decks✓*/
