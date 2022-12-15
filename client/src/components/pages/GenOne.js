import React, { useState, useEffect } from "react";
import pokeballOpen from "../../images/pokeball-open.png";
import pokeballClosed from "../../images/pokeball-closed.png";
import DexTabs from '../DexTabs'
import Tada from "react-reveal/Tada";
import { useMutation, useQuery } from "@apollo/client";
import { CATCH_POKEMON, UNCATCH_POKEMON } from "../../utils/mutations";
import { QUERY_USER } from "../../utils/queries";
import bug from "../../images/types/bug.png";
import dark from "../../images/types/dark.png";
import dragon from "../../images/types/dragon.png";
import electric from "../../images/types/electric.png";
import fairy from "../../images/types/fairy.png";
import fire from "../../images/types/fire.png";
import flying from "../../images/types/flying.png";
import fighting from "../../images/types/fighting.png";
import ghost from "../../images/types/ghost.png";
import grass from "../../images/types/grass.png";
import ground from "../../images/types/ground.png";
import ice from "../../images/types/ice.png";
import normal from "../../images/types/normal.png";
import poison from "../../images/types/poison.png";
import psychic from "../../images/types/psychic.png";
import rock from "../../images/types/rock.png";
import steel from "../../images/types/steel.png";
import water from "../../images/types/water.png";

export default function GenOne() {
    
  // fetching all pokemon from JSON Data
  const [JSONdata, setJSONData] = useState([]);

  const getData = () => {
    fetch("./gen-1.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setJSONData(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  // end of fetch

  // username
  const currentUser = localStorage.getItem("username");

  // queries and mutations
  const [catchPokemon, { catchErr, catchData }] = useMutation(CATCH_POKEMON);
  const [unCatchPokemon, { unCatchErr, unCatchData }] =
    useMutation(UNCATCH_POKEMON);

  const { loading, data: userValue } = useQuery(QUERY_USER, {
    variables: { username: currentUser },
  });

  // users pokemon caught state
  const [userData, setUserData] = useState({
    pokemonCaught: [],
  });

  //  setting the state of pokemon caught
  useEffect(() => {
    if (!loading && userValue) {
      setUserData({
        pokemonCaught: userValue?.user?.pokemonCaught?.map(
          (caught) => caught.entry
        ),
      });
    }
  }, [loading, userValue]);

  function newCatch(entry) {
    catchPokemon({
      variables: {
        username: currentUser,
        entry: parseInt(entry),
      },
    });
  }

  function releaseCatch(entry) {
    unCatchPokemon({
      variables: {
        username: currentUser,
        entry: parseInt(entry),
      },
    });
  }

  function toggleCatch(entry) {
    if (!userData.pokemonCaught.includes(parseFloat(entry))) {
      newCatch(entry);
      userData.pokemonCaught = [...userData.pokemonCaught, parseInt(entry)];
      document.getElementById(`${entry}`).src = pokeballClosed;
    } else {
      releaseCatch(entry);
      userData.pokemonCaught = userData.pokemonCaught.filter(
        (pokemon) => pokemon != parseInt(entry)
      );
      document.getElementById(`${entry}`).src = pokeballOpen;
    }
  }

  const getTypeOne = (splitFirst) => {
    let type = splitFirst.trim();
    let split = type.split(" ");

    switch (split[0]) {
      case "Bug":
        return bug;
      case "Dark":
        return dark;
      case "Dragon":
        return dragon;
      case "Electric":
        return electric;
      case "Fairy":
        return fairy;
      case "Fire":
        return fire;
      case "Flying":
        return flying;
      case "Fighting":
        return fighting;
      case "Ghost":
        return ghost;
      case "Ground":
        return ground;
      case "Ice":
        return ice;
      case "Normal":
        return normal;
      case "Poison":
        return poison;
      case "Psychic":
        return psychic;
      case "Rock":
        return rock;
      case "Steel":
        return steel;
      case "Water":
        return water;
      case "Grass":
        return grass;
    }
  };

  const getTypeTwo = (splitSecond) => {
    let types = splitSecond.trim();
    let split = types.split(" ");

    switch (split[1]) {
      case "Bug":
        return bug;
      case "Dark":
        return dark;
      case "Dragon":
        return dragon;
      case "Electric":
        return electric;
      case "Fairy":
        return fairy;
      case "Fire":
        return fire;
      case "Flying":
        return flying;
      case "Fighting":
        return fighting;
      case "Ghost":
        return ghost;
      case "Ground":
        return ground;
      case "Ice":
        return ice;
      case "Normal":
        return normal;
      case "Poison":
        return poison;
      case "Psychic":
        return psychic;
      case "Rock":
        return rock;
      case "Steel":
        return steel;
      case "Water":
        return water;
      case "Grass":
        return grass;
    }
  };

  return (
<div
  id="top">
  <DexTabs/>
    <div 
      className="gen-one-bg ">
      <div
        className=" user-menu-bg pb-3 d-flex flex-column align-items-center">
          <h1 
            style={{color: 'white', fontSize:'3vw'}}
            className="text-center header pt-4">Kanto
          </h1>
          {JSONdata.map((pokemon, i) => {
            return (
              <div
                className="list-group-item-success mb-4 w-75"
                key={parseInt(pokemon.entry)}>
                <ul 
                  className="d-flex align-items-center">
                  <li 
                    style={{maxWidth:'5vw'}}
                    className="col-sm-2 text-center">
                    <img
                      style={{maxWidth:'100%'}}
                      src={pokemon.sprite}>
                    </img>
                  </li>
                  <li 
                    style={{maxWidth: '20vw'}}
                    className="col-sm-2 text-center">
                    <h4
                      style={{fontSize:'100%'}}>#{pokemon.entry}
                    </h4>
                  </li>
                  <li
                    style={{maxWidth:'30vw'}}
                    className="col-sm-4 text-center">
                    <h4
                      className="text-center"
                      style={{fontSize:'2vw'}}>{pokemon.name}
                    </h4>
                  </li>
                  <li 
                    className="col-sm-3 text-center">
                    <img 
                      style={{maxWidth:'2.5vw'}} src={getTypeOne(pokemon.type)}></img>
                    <img 
                      style={{maxHeight:'2.5vw'}} src={getTypeTwo(pokemon.type)}>
                    </img>
                  </li>
                  <li
                    className="col-sm-3 text-center">
                    <Tada duration={2500}>
                      <img
                        id={parseInt(pokemon.entry)}
                        key={parseInt(pokemon.entry)}
                        className="pokeball"
                        src={
                          !userData.pokemonCaught.includes(
                            parseInt(pokemon.entry)
                          )
                            ? pokeballOpen
                            : pokeballClosed
                        }
                        onClick={() => toggleCatch(parseInt(pokemon.entry))}>
                      </img>
                    </Tada>
                  </li>
                </ul>
              </div>
            );
          })}
          <a 
            style={{color: 'white', textDecoration:'none'}}
            className="text-center"
            href="#top">Back To Top
        </a>
      </div>
    </div>
  </div>
  );
}
