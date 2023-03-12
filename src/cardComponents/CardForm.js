import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import Breadcrumb from "../Layout/Breadcrumb";
import { createCard, readCard, readDeck, updateCard } from "../utils/api";

function CardForm() {
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const [currentDeck, setCurrentDeck] = useState([]);
  const [currentCard, setCurrentCard] = useState([]);
  const history = useHistory();

  const { cardId, deckId } = useParams();

  useEffect(() => {
    async function loadCard() {
      if (cardId) {
        const currentCardLoad = await readCard(cardId);
        setCurrentCard(() => currentCardLoad);
      }
    }
    loadCard();
  }, []);

  useEffect(() => {
    async function loadDeck() {
      if (deckId) {
        const currentDeckLoad = await readDeck(deckId);
        setCurrentDeck(() => currentDeckLoad);
      }
    }
    loadDeck();
  }, []);

  const cardFrontChangeHandler = ({ target }) => setCardFront(target.value);
  const cardBackChangeHandler = ({ target }) => setCardBack(target.value);

  const submitHandler = (event) => {
    if (cardId) {
      const updatedCard = {
        id: cardId,
        front: cardFront,
        back: cardBack,
        deckId: currentDeck.id,
      };
      async function cardUpdate() {
        try {
          await updateCard(updatedCard);
        } catch (error) {
          throw error;
        }
      }
      cardUpdate();
    } else {
      const newCard = {
        front: cardFront,
        back: cardBack,
        deckId: currentDeck.id,
      };
      async function cardCreate() {
        try {
          await createCard(deckId, newCard);
        } catch (error) {
          throw error;
        }
      }
      cardCreate();
    }
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      {!cardId ? (
        <Breadcrumb
          link={`/decks/${deckId}`}
          linkName={currentDeck.name}
          name={"Add Card"}
        />
      ) : (
        <Breadcrumb
          link={`/decks/${deckId}`}
          linkName={currentDeck.name}
          name={"Edit Card"}
        />
      )}
      {!cardId ? (
        <h3>{currentDeck.name} : Add Card</h3>
      ) : (
        <h3>{currentDeck.name} : Edit Card</h3>
      )}
      <form className="form-group" name="createCard">
        <label className="my-3" htmlFor="cardFront">
          Front
        </label>
        {!cardId ? (
          <div>
            <textarea
              id="name"
              className="form-control"
              name="name"
              required={true}
              onChange={cardFrontChangeHandler}
              placeholder="Front side of the card"
              rows="4"
            />
            <label className="my-3" htmlFor="desc">
              Back
            </label>
            <textarea
              name="cardBack"
              id="cardBack"
              className="form-control"
              required={true}
              onChange={cardBackChangeHandler}
              placeholder="Back side of the card"
              rows="4"
            />
          </div>
        ) : (
          <div>
            <textarea
              id="cardFront"
              className="form-control"
              name="cardFront"
              required={true}
              onChange={cardFrontChangeHandler}
              defaultValue={currentCard.front}
              rows="3"
            />
            <label className="my-3" htmlFor="desc">
              Back
            </label>
            <textarea
              name="cardBack"
              id="cardBack"
              className="form-control"
              required={true}
              onChange={cardBackChangeHandler}
              defaultValue={currentCard.back}
              rows="3"
            />
          </div>
        )}

        <div className="flex btn-group">
          <div className="my-3">
            <Link to="/">
              <button className="btn btn-secondary">Done</button>
            </Link>
            <button
              className="btn btn-primary mx-2"
              type="submit"
              onClick={submitHandler}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CardForm;

/*TODO:
        breadcrumb with home, deck name and "add card"
        form with front and back textareas
        done and save button
            done should path to deck screen
            save should create new card and associate it with the related deck, then empty all fields
        should call readDeck function
        should prefill information if cardId is provided for editcard
*/
