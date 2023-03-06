import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Breadcrumb from "../Layout/Breadcrumb";
import { createDeck, readDeck } from "../utils/api";

function CreateDeck({ deck, setDeck }) {
  const name = "Create Deck";
  const [deckName, setDeckName] = useState("");
  const [desc, setDesc] = useState("");
  const { deckId } = useParams();

  const nameChangeHandler = ({ target }) => setDeckName(target.value);
  const descChangeHandler = ({ target }) => setDesc(target.value);

  const submitHandler = (event) => {
    event.preventDefault();
    const newDeck = {
      name,
      desc,
    };
    if (deckId > 0) {
      updateDeck(newDeck);
    } else {
      createDeck(newDeck);
    }
    setName("");
    setDesc("");
  };

  useEffect(() => {
    async function loadDeck() {
      if (deckId) {
        const currentDeck = await readDeck(deckId);
        setDeck(() => currentDeck);
      }
    }
    loadDeck();
  }, []);

  return (
    <div>
      {!deckId ? (
        <Breadcrumb name={"Create Deck"} />
      ) : (
        <Breadcrumb name={"Edit Deck"} />
      )}
      {!deckId ? <h3>Create Deck</h3> : <h3>Edit Deck</h3>}
      <form className="form-group" name="createDeck" onSubmit={submitHandler}>
        <label className="my-3" htmlFor="name">
          Name
        </label>
        {!deckId ? (
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            required={true}
            onChange={nameChangeHandler}
            placeholder="Deck Name"
          />
        ) : (
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            required={true}
            onChange={nameChangeHandler}
            defaultValue={deck.name}
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
            defaultValue={deck.description}
            rows="4"
          />
        )}
        <div className="container">
          <div className="row">
            <div className="flex btn-group">
              <div className="my-3">
                <Link to="/">
                  <button className="btn btn-secondary">Cancel</button>
                </Link>
              </div>
              <div className="my-3 px-2">
                <Link to="/decks">
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateDeck;

/* TODO:
        breadcrumb with home and create deck✓
        form with two inputs✓
            the name field is an <input> field of type text✓
            the description field is a <textarea> field that can be multiple lines of text✓
            submit button that should path to the deck screen
            cancel button that should path to home screen✓
        if path includes a deckId, name and description should have the exising info, heading should change to edit deck✓
*/
