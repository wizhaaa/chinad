import React, {useState} from "react"
import Item from "./Item"
import Header from "./Header"

function App() {
  return (
    <div>
    <Header />
      <div className="items-container"> 
      <Item /><Item /><Item /><Item /><Item />
      </div>
    </div>
  );
}

export default App;
