import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Breadcrumb from "../Layout/Breadcrumb";
import { createDeck, readDeck, updateDeck } from "../utils/api";

function DeckForm({ deck, setDeck, setDeckLoader, deckLoader}) {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const { deckId } = useParams();
  const history = useHistory();

  const nameChangeHandler = ({ target }) => setDeckName(target.value);
  const descChangeHandler = ({ target }) => setDeckDescription(target.value);

  useEffect(() => {
    async function loadDeck() {
      if (deckId) {
        const currentDeck = await readDeck(deckId);
        setDeckName(currentDeck.name);
        setDeckDescription(currentDeck.description);
      }
    }
    loadDeck();
  }, [deckId]);

  const submitHandler = (event) => {
    event.preventDefault();

    if (deckId) {
      const updatedDeck = {
        id: deckId,
        name: deckName,
        description: deckDescription,
      };
      async function deckUpdate() {
        try {
          await updateDeck(updatedDeck);
        } catch (error) {
          throw error;
        }
      }
      deckUpdate();
    } else {
      const newDeck = {
        name: deckName,
        description: deckDescription,
      };

      async function deckCreate() {
        try {
          const completedDeck = await createDeck(newDeck);
          history.push(`/decks/${completedDeck.id}`)
        } catch (error) {
          throw error;
        }
      }
      deckCreate();
    }
    history.push('/')
    setDeckLoader(!deckLoader)
  };




  return (
    <div>
      {!deckId ? (
        <Breadcrumb name={"Create Deck"} />
      ) : (
        <Breadcrumb name={"Edit Deck"} />
      )}
      {!deckId ? <h3>Create Deck</h3> : <h3>Edit Deck</h3>}
      <form className="form-group" name="createDeck" >
        <label className="my-3" htmlFor="name">
          Name
        </label>
        {!deckId ? (
          <input
            className="form-control"
            type="text"
            id="deckName"
            name="deckName"
            required={true}
            onChange={nameChangeHandler}
            placeholder="Deck Name"
          />
        ) : (
          <input
            className="form-control"
            type="text"
            id="deckName"
            name="deckName"
            required={true}
            onChange={nameChangeHandler}
            value={deckName}
          />
        )}
        <label className="my-3" htmlFor="desc">
          Description
        </label>
        {!deckId ? (
          <textarea
            className="form-control"
            name="desc"
            id="desc"
            required={true}
            onChange={descChangeHandler}
            placeholder="Brief description of the deck"
            rows="4"
          />
        ) : (
          <textarea
            className="form-control"
            name="desc"
            id="desc"
            required={true}
            onChange={descChangeHandler}
            value={deckDescription}
            rows="4"
          />
        )}
        <div className="container">
          <div className="row">
            <div className="flex btn-group">
              <div className="my-3">
                {deckId ? (<Link to={`/decks/${deckId}`}>
                  <button type="button" className="btn btn-secondary">Cancel</button>
                </Link>) : (<Link to={"/"}>
                  <button type="button" className="btn btn-secondary">Cancel</button>
                </Link>)}
              </div>
              <div className="my-3 px-2">
                  <button className="btn btn-primary" onClick={submitHandler} type="submit">
                    Submit
                  </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DeckForm;

/* TODO:
        breadcrumb with home and create deck✓
        form with two inputs✓
            the name field is an <input> field of type text✓
            the description field is a <textarea> field that can be multiple lines of text✓
            submit button that should path to the deck screen
            cancel button that should path to home screen✓
        if path includes a deckId, name and description should have the exising info, heading should change to edit deck✓
*/
