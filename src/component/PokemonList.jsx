import React, { useEffect, useState } from "react";
import logo from "../img/pokeapi.png";
import "../styles/PokemonList.css";
const pokeUrl = "https://pokeapi.co/api/v2/pokemon";

const PokemonList = () => {
  const [pokesApi, setPokesApi] = useState([]);
  const [currentPokeName, setCurrentPokeName] = useState("");
  const [currentPokeUrl, setCurrentPokeUrl] = useState("");
  const [currentPokeApi, setCurrentPokeApi] = useState("");
  const [currentPokeImg, setCurrentPokeImg] = useState("");
  const [currentPokeImgSh, setCurrentPokeImgSh] = useState("");
  const [shiny, setShiny] = useState(false);

  useEffect(() => {
    fetch(pokeUrl + "?limit=100&offset=0")
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
  };

  return (
    <div id='page-container'>
      <div id="content-wrap">
        <nav className="navbar navbar-dark bg-dark">
          <div className="container d-flex justify-content-center">
            <a className="navbar-brand" href="#">
              <img src={logo} alt="Logo" height="50" />
            </a>
            <select
              className="form-select form-select text-center"
              style={{ maxWidth: "360px" }}
              aria-label=".form-select-lg example"
              onChange={(e) => {
                setCurrentPokeName(e.target.value);
                setCurrentPokeUrl(
                  e.target.value === ""
                    ? ""
                    : pokesApi.find((poke) => poke.name === e.target.value).url
                );
              }}
            >
              <option value="" defaultValue>
                Lista de Pokemones Disponibles
              </option>
              {pokesApi
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((itm, idx) => (
                  <option key={idx} value={itm.name}>
                    {itm.name.toUpperCase()}
                  </option>
                ))}
            </select>
          </div>
        </nav>
        {currentPokeName === "" ? (
          <div className="p-3 my-5 bg-danger text-white text-center">
            <img src={logo} alt="Logo" />
            <h2>Encuentra tu Pokemon Favorito</h2>
          </div>
        ) : (
          <div className="card my-3 mx-auto" style={{ maxWidth: "600px" }}>
            <div className="row g-0">
              <div className="col-md-7">
                <img
                  src={shiny ? currentPokeImg : currentPokeImgSh}
                  className="img-fluid rounded-start"
                  alt={currentPokeName + " img"}
                />
              </div>
              <div className="col-md-5 my-auto">
                <div className="card-body">
                  <h2 className="card-title fw-bold">
                    {currentPokeName.toUpperCase()}
                  </h2>
                  <h5 className="card-text fw-bold mb-1">
                    Experiencia: {currentPokeApi.base_experience}
                  </h5>
                  <h5 className="card-text fw-bold mb-1">
                    Peso: {currentPokeApi.weight / 10} kg
                  </h5>
                  <h5 className="card-text fw-bold mb-1">
                    Altura: {currentPokeApi.height * 10} cm
                  </h5>
                  <a
                    href="#"
                    className={
                      shiny
                        ? "btn btn-warning mt-2"
                        : "btn btn-outline-warning mt-2"
                    }
                    onClick={handleClickShiny}
                  >
                    Shiny
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <footer id="footer">
        <a href="https://github.com/nicosis/pokemon-api" target="_blank">
          made by nicosis
        </a>
      </footer>
    </div>
  );
};

export default PokemonList;
