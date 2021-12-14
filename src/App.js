import './App.css';
import { useState } from "react"; 
import axios from 'axios'
import Highlighter from "react-highlight-words";



function App() {

  const [pokemonName, setPokemonName] = useState("");
  const [indexerRes, setIndexderRes] = useState([]);
  const [word,setWord] = useState([]);
  
  // get the json data 

  function searchPokemon(){
    
    //Indexer
    axios.get(`http://ec2-107-23-251-43.compute-1.amazonaws.com:8080/search/${pokemonName}`).then((indexer) => {
      
      





      setIndexderRes(
        indexer.data
      )

      
      console.log(indexer)
      
    })
    }

  function getHighlightedText(text, highlight) {
      // Split on highlight term and include term into parts, ignore case
      const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
      
      return <span> { parts.map((part, i) => 
        
          <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold',fontSize: 25 } : {} }>
              { part }
          </span>)
      } 
      </span>;
  }  

  
  function toHighlight(content){
    for(var i =0; i< word.length; i++){
      getHighlightedText(content,word[i])
    }
  }
  
  

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
          setWord(
            pokemonName.split(" ")
          )
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
                <div className = "url"><a href={loc.url} style = {{color: "#0074D9"}} target="_blank">{loc.title}</a></div>
                <div key = {loc.nearby_content} style = {{color: "#85144b"}}>
                  {word.map(inputword =>(getHighlightedText(loc.nearby_content,inputword)))}
                </div>
                </div>
              ))}
        </div>
      </div>

    </div>
    
  );
}
  

export default App;
