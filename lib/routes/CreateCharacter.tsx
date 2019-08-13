import SaveIcon from "@material-ui/icons/Save";
import kebabCase from "lodash/kebabCase";
import React, { useState } from "react";
import { routerHistory } from "..";
import { AppFab } from "../components/AppFab";
import { AppLink } from "../components/AppLink";
import { CharacterFields } from "../components/CharacterFields";
import { getCharactersDb } from "../database/database";
import { getGameBySlug } from "../games/games";

export const CreateCharacter = props => {
  const { gameSlug } = props.match.params;
  const game = getGameBySlug(gameSlug);
  const [character, setCharacter] = useState({});

  return (
    <div className="route-box">
      <h1>Create Character</h1>
      <h2>
        <AppLink to={`/game/${game.slug}`}>All Characters</AppLink>
      </h2>
      <AppFab onClick={save}>
        <SaveIcon />
      </AppFab>

      <br />
      <CharacterFields
        rows={game.rows}
        character={character}
        setCharacter={setCharacter}
        onSubmit={save}
      />
    </div>
  );

  async function save() {
    const id = createId(kebabCase(character["name"]));
    await getCharactersDb(game).put({ ...character, _id: id }, {});
    routerHistory.push(`/game/${game.slug}/play/${id}?new=true`);
  }
};

function createId(slug: string) {
  const fourRandomDigits = `${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}`;
  return `${slug}-${fourRandomDigits}`;
}

function getRandomDigit(): any {
  return Math.floor(Math.random() * 100) % 10;
}
