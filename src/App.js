import './App.css';
import { useState } from "react"; 
import axios from 'axios'
import Highlighter from "react-highlight-words";



function App() {

  const [wordToSearch, setwordToSearch] = useState("");
  const [indexerRes, setIndexderRes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("result not found");
  const [splitWord, setSplitWord] = useState([]);
  
  
  // get the json data 

  function searchword(){
    //Indexer
    axios.get(`http://184.72.110.242:8080/search/${wordToSearch}`).then((response) => {
      
      setIndexderRes(
        response.data
      )
      // setSplitWord(
      //   splitWord.split(",")
      // )
      console.log(indexerRes)
    })
    .catch(function (error){
      if (error.response){
        setIndexderRes(
          []
        )
        console.log(indexerRes)
      }
    });
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

  function renderContent() {
    if (indexerRes.length !== 0) {
      return <div className = "DisplaySection">
          
      {indexerRes.map((loc) => (
            <div className = "res">
            <div key={loc.url} style = {{color: "#85144b"}}>{loc.url}</div>
            <div className = "url"><a href={loc.url} style = {{color: "#0074D9"}} target="_blank">{loc.title}</a></div>
            <div key = {loc.nearby_content} style = {{color: "#85144b"}}>
              {getHighlightedText(loc.nearby_content,loc.highlight_words)}
            </div>
            </div>
          ))}
    </div> // pass states as props down to child
    }
    else{
      console.log("error input")
      return <div className='Noresult'>Please enter a valid word</div>
    }
    
}

    
  


  return (
    <div className = "App">
      <div className="TitleSection">
        <h1>Search it !</h1> 
        <input 
          type = "text" 
          onChange = {(event) => {
            setwordToSearch(event.target.value);         
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              searchword()
              // console.log(indexerRes)
            }
          }}    
        />
        <button 
        onClick = {() =>{
          if(wordToSearch != ""){
          
          // const start = new Date();
          searchword();
          // const timeTaken = (new Date()) - start;
          // console.log(timeTaken);
          }else{
            setIndexderRes([]);
          }
        }
        }>

        Search!
        </button>
        
        {/* <div className = "DisplaySection">
          
          {indexerRes.map((loc) => (
                <div className = "res">
                <div key={loc.url} style = {{color: "#85144b"}}>{loc.url}</div>
                <div className = "url"><a href={loc.url} style = {{color: "#0074D9"}} target="_blank">{loc.title}</a></div>
                <div key = {loc.nearby_content} style = {{color: "#85144b"}}>
                  {getHighlightedText(loc.nearby_content,loc.highlight_words)}
                </div>
                </div>
              ))}
        </div> */}
        {renderContent()}
        
      </div>

    </div>
    
  );
          }
  
          
        
  

export default App;
