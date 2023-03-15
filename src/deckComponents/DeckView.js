import React, { useEffect, useState } from "react";
import { useParams, Link, useRouteMatch, useHistory } from "react-router-dom";
import Breadcrumb from "../Layout/Breadcrumb";
import { deleteDeck, readDeck } from "../utils/api";
import CardList from "../cardComponents/CardList";
import NotFound from "../Layout/NotFound";

function DeckView({ deck, setDeck, setDeckLoader, deckLoader }) {
  const [cardLoader, setCardLoader] = useState(false);
  const { deckId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      if (deckId) {
        const currentDeck = await readDeck(deckId);
        setDeck(() => currentDeck);
      }
    }
    loadDeck();
  }, [deckId, setDeck, cardLoader]);

  const deleteHandler = async () => {
    const confirm = window.confirm(
      "Delete this deck?\n You will not be able to recover it."
    );
    if (confirm) {
      await deleteDeck(deckId);
      setDeckLoader(!deckLoader)
      history.push("/");
    }
  };

  if (deck.id) {
    return (
      <div>
        <Breadcrumb name={deck.name} />
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <div className="btn-toolbar m-2 mb-3">
        <Link to={`${url}/edit`}>
          <button type="button" className="mr-1 btn btn-secondary">
            ✎ Edit
          </button>
        </Link>
        <Link to={`${url}/study`}>
          <button type="button" className=" btn btn-primary">
            📓 Study
          </button>
        </Link>
        <Link to={`${url}/cards/new`}>
          <button type="button" className="mx-1 btn btn-primary">
            + Add Cards
          </button>
        </Link>
        <button
          type="button"
          className=" btn btn-danger"
          onClick={deleteHandler}
        >
          🗑️
        </button></div>
        <h4 className="mb-3">Cards</h4>
        <CardList deck={deck} cardLoader={cardLoader} setCardLoader={setCardLoader}/>
      </div>
    );
  }
  return (
    <div>
      <NotFound />
    </div>
  );
}

export default DeckView;

/* TODO:
        readDeck function should be called ✓
        breadcrumb with home and name of deck ✓
        includes deck name and description✓
        should have buttons that path ✓
            edit - createDeck✓
            study - studyDeck✓
            addCards - createCard✓
            delete - warning message, if confirmed, should return to home✓
        cards should display from cardlist
            should have button to edit, pathing to createcard
            delete button should warn and then delete card
*/
