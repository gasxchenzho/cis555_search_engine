import './App.css';
import { useState } from "react"; 
import axios from 'axios'

function App() {

  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState({
    name: "", 
    species: "", 
    img: "", 
    hp: "",
    attack: "",
    defense: "",
    type: "",
  })

  const [pokemonChosen, setPokemonChosen] = useState(false);

  const searchPokemon = () =>{
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((Response) => {
      setPokemon({
        name: pokemonName, 
        species: Response.data.species.name, 
        img: Response.data.sprites.front_default, 
        hp: Response.data.stats[0].base_stat,
        attack: Response.data.stats[1].base_stat,
        defense: Response.data.stats[2].base_stat,
        type: Response.data.types[0].type.name,
      });
      setPokemonChosen(true);

    }
    );
  };





  return (
    <div className = "App">
      <div className="TitleSection">
        <h1>Pokemon Stats</h1> 
        <input 
          type = "text" 
          onChange = {(event) => {
            setPokemonName(event.target.value);
        }}
        />
        <button onClick = {searchPokemon}>
          Search Pokemon
        </button>
      </div>
      <div className = "DisplaySection">
        {!pokemonChosen ? 
        (<h1> please choose a Pokemon</h1>)
        :
        (
        <>
          <h1>{pokemon.name}</h1>
          <img src ={pokemon.img} />
          <h3>Species: {pokemon.species}</h3>
          <h3>Type: {pokemon.type}</h3>
          <h4>Hp: {pokemon.hp}</h4>
          <h4>Attack: {pokemon.attack}</h4>
          <h4>Defense: {pokemon.defense}</h4>
        </>
        )

      }

      </div>
    </div>
    
  );
}

export default App;
