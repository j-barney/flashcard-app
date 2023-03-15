import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../Layout/Breadcrumb";
import CardView from "../cardComponents/CardView";
import NotFound from "../Layout/NotFound";
import { readDeck } from "../utils/api";

function StudyDeck() {
  const { deckId } = useParams();
  const [studyDeck, setStudyDeck] = useState([]);

  useEffect(() => {
    async function loadDeck() {
      if (deckId) {
        const currentDeck = await readDeck(deckId);
        setStudyDeck(() => currentDeck);
      }
    }
    loadDeck();
  }, [deckId]);

  if (studyDeck.id) {
    return (
      <div>
        <Breadcrumb
          link={`/decks/${deckId}`}
          linkName={studyDeck.name}
          name={"Study"}
        />
        <h2 className="mb-3">{studyDeck.name} : Study</h2>
        <CardView deck={studyDeck} />
      </div>
    );
  } else {
    return <NotFound />;
  }
}

export default StudyDeck;

/* TODO:
        load deck with readDeck() function
        create breadcrumb with link to home, name of deck being studied, and "Study"
        display the deck title followed by a card
            card should have current card number out of how many total cards (ie 1 of 3)
            should have a flip button that should change the card to the opposite side of the card
            after flipping, a next button should be shown on the card
            after the final card, warning message should prompt restart or cancel, to restart the deck or return to home
            if the deck has fewer than 3 cards, not enough cards message should show along with a button to add cards, which should path to add card screen
*/
