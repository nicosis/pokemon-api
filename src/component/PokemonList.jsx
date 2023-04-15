import React, { useEffect, useState } from "react";
import logo from "../img/pokeapi.png";
const pokeUrl = "https://pokeapi.co/api/v2/pokemon";

const PokemonList = () => {
  const [pokesApi, setPokesApi] = useState([]);
  const [currentPokeName, setCurrentPokeName] = useState("");
  const [currentPokeUrl, setCurrentPokeUrl] = useState("");
  const [currentPokeApi, setCurrentPokeApi] = useState("");
  const [currentPokeImg, setCurrentPokeImg] = useState("");
  const [currentPokeImgSh, setCurrentPokeImgSh] = useState("");
  const [shiny, setShiny] = useState(false);
  console.log(currentPokeImgSh);
  console.log(currentPokeImg);
  // console.log(
  //   currentPokeApi["sprites"].other["official-artwork"].front_default
  // );

  useEffect(() => {
    fetch(pokeUrl + "?limit=30")
      .then((response) => response.json())
      .then((data) => {
        setPokesApi(data.results);
        // console.log(data.results);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(currentPokeUrl)
      .then((response) => response.json())
      .then((data) => {
        setCurrentPokeApi(data);
        setCurrentPokeImg(data.sprites.other["official-artwork"].front_default);
        setCurrentPokeImgSh(data.sprites.other["official-artwork"].front_shiny);
        // console.log(data.sprites.other["official-artwork"].front_shiny);
      })
      .catch((error) => console.log(error));
  }, [currentPokeName]);

  const handleClickShiny = () => {
    setShiny(!shiny);
    console.log(shiny);
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Logo" height="60" />
          </a>
        </div>
      </nav>

      <select
        className="form-select form-select mb-3 mx-auto mt-2"
        style={{ maxWidth: "540px" }}
        aria-label=".form-select-lg example"
        onChange={(e) => {
          setCurrentPokeName(e.target.value);
          setCurrentPokeUrl(
            pokesApi.find((poke) => poke.name === e.target.value).url
          ); //no entiendo
        }}
      >
        <option value="" defaultValue>
          Selecciona tu Pokemon
        </option>
        {pokesApi.map((itm, idx) => (
          <option key={idx} value={itm.name}>
            {itm.name.toUpperCase()}
          </option>
        ))}
      </select>

      <div className="card mb-3 mx-auto" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-7">
            <img
              src={shiny ? currentPokeImg : currentPokeImgSh}
              className="img-fluid rounded-start"
              alt={currentPokeName + " img"}
            />
          </div>
          <div className="col-md-5">
            <div className="card-body">
              <h3 className="card-title">{currentPokeName.toUpperCase()}</h3>
              <p className="card-text fw-bold mb-1">
                Experiencia base: {currentPokeApi.weight}
              </p>
              <p className="card-text">
                Corresponde a la cantidad mínima de experiencia que recibe un
                Pokémon al derrotar a otro.
              </p>
              <a
                href="#"
                class={shiny ? "btn btn-warning" : "btn btn-outline-warning"}
                onClick={handleClickShiny}
              >
                Shiny
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
