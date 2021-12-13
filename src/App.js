import './App.css';
import { useState } from "react"; 
import axios from 'axios'
import Highlighter from "react-highlight-words";



function App() {

  const [pokemonName, setPokemonName] = useState("");
  const [indexerRes, setIndexderRes] = useState([]);
  
  // get the json data 

  function searchPokemon(){
    
    //Indexer
    axios.get(`http://ec2-107-23-251-43.compute-1.amazonaws.com:4567/hello/${pokemonName}`).then((indexer) => {
      
      





      setIndexderRes(
        indexer.data
      )

      indexerRes.sort((a,b) => (a.tf_idf   < b.tf_idf ) ? 1 : -1 )
      console.log(indexerRes)
      
    })
    }

  // function getHighlightedText(text, highlight) {
  //     // Split on highlight term and include term into parts, ignore case
  //     const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  //     return <span> { parts.map((part, i) => 
  //         <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold',fontSize: 25 } : {} }>
  //             { part }
  //         </span>)
  //     } </span>;
  // }  




  

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
          if(pokemonName != ""){
          searchPokemon();
          }else{
            setIndexderRes([]);
          }
        }
        }>
        Search!
        </button>
        <div className = "DisplaySection">
          {indexerRes.map((loc) => (
                <div className = "res">
                <div key={loc.url} style = {{color: "#85144b"}}>{loc.url}</div>
                <div className = "url"><a href={loc.url} style = {{color: "#0074D9"}}>{loc.title}</a></div>
                <div key = {loc.nearby_contents} style = {{color: "#85144b"}}>
                  {loc.nearby_contents}
                </div>
                </div>
              ))}
        </div>
      </div>

    </div>
    
  );
}
  

export default App;
