import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import StudyDeck from "../deckComponents/StudyDeck";
import DeckForm from "../deckComponents/DeckForm";
import CardForm from "../cardComponents/CardForm";
import DeckView from "../deckComponents/DeckView";
import Home from "./Home";
import { Switch, Route } from "react-router-dom";
import { listDecks } from "../utils/api";

function Layout() {
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState([]);
  const [deckLoader, setDeckLoader] = useState(false);


  useEffect(() => {
    setDecks([]);

    const abortController = new AbortController();

    async function loadDecks() {
      try {
        const deckList = await listDecks();
        setDecks(deckList);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadDecks();

    return () => abortController.abort();
  }, [deckLoader]);

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home decks={decks} setDeckLoader={setDeckLoader} deckLoader={deckLoader} />
          </Route>
          <Route exact path="/decks/new">
            <DeckForm deck={deck} setDeck={setDeck} setDeckLoader={setDeckLoader} deckLoader={deckLoader}/>
          </Route>
          <Route path="/decks/:deckId/edit">
            <DeckForm deck={deck} setDeck={setDeck} setDeckLoader={setDeckLoader} deckLoader={deckLoader}/>
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckView deck={deck} setDeck={setDeck} setDeckLoader={setDeckLoader} deckLoader={deckLoader}  />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CardForm setDeckLoader={setDeckLoader} deckLoader={deckLoader}/>
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <CardForm setDeckLoader={setDeckLoader} deckLoader={deckLoader}/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;

/* TODO: 
        display create deck button, route to create deck screen
        deckList should display all existing decks here
          decks should have 
            study option that routes to study screen
            view option that routes to deckview screen
            delete option that displays a warning then deletes the deck
*/
