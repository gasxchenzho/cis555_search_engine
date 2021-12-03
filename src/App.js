import './App.css';
import { useState } from "react"; 
import axios from 'axios'


function App() {

  const [pokemonName, setPokemonName] = useState("");
  const [indexerRes, setIndexderRes] = useState([]);
  var data = require("./data.json");
  // get the json data 

  function searchPokemon(){
    //Indexer
    axios.get(`https://pokeapi.co/api/v2/pokemon`).then((indexer) => {
      
      // globalResult = Res;
      // var docList = [];
      // for (let i = 0; i < Res.length; i++){
      //   docList[i] = Res[i].name
      // }
      // console.log(indexer.data.results.name);
      // console.log(indexer)
      setIndexderRes(
        indexer.data.results
      );
      // console.log(indexer);
      

      // console.log(Res);
      
    })
    }

  function showResults(){
    // console.log(Res);
    // console.log(pokemonRes);
  }
      

      // pageRank
    // axios.get(`https://pokeapi.co/api/v2/pokemon`).then((pagerank) => {
    //   var PRRes = pagerank.data.results;
    //   for (let i = 0; i < PRRes.length; i++){
    //     // Res[i].score = ....
    //   }
    
    // Res.sort(function(a, b) {
    //     return a.score - b.score;
    // }); 
    
    // })

  return (
    <div className = "App">
      <div className="TitleSection">
        <h1>Search it !</h1> 
        <input 
          type = "text" 
          onChange = {(event) => {
            setPokemonName(event.target.value);
        }}
        />
        <button onClick = {() =>{
          searchPokemon();
        }
        }>
        Search!
        </button>
        <div>{console.log(indexerRes)}</div>
        <div className = "DisplaySection">
          {indexerRes.map((loc) => (
                <div className = "res">
                <div key={loc.name} style = {{color: "#85144b"}}>{loc.name}</div>
                <div className = "url"><a href={loc.url} style = {{color: "#0074D9"}}>{loc.url}</a></div>
                {/* <Link to={`/${loc}`} onClick={(anchor) => updateCity(anchor)}>{loc}</Link> */}
                </div>
              ))}
        </div>
      </div>

    </div>
    
  );
}
  

export default App;
