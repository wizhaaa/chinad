import React, { useState, useEffect } from "react";
import Item from "./Item";
import axios from "axios";

const defaultItem = {
  name: "",
  price: "",
};

function App() {
  
  const [item, setItem] = useState(defaultItem); 
  const [items, setItems] = useState([]);

  useEffect( () => {
    axios.get("/api/items")
      .then( (res) => setItem(res.data))
      .catch( (err) => console.log(err));
  }, []);

  function handleChange(event) { 
    const {name, value} = event.target;
    setItem( {...item, [name]: value });
  }

  function addItem(newItem) { 
    axios.post("/api/item/add", newItem) 
      .then( (res) => setItems([...items, res.data]))
      .catch( (err) => console.log(err));
  }

  return (
    <div>
    <form onSubmit={ (e) => e.preventDefault()}> 
    <input 
      name="name"
      type="text"
      placeholder="Enter the item name"
      value={item.name}
      onChange={handleChange}
    />
    <input 
      name="price" 
      type="number"
      placeholder="Price"
      value={item.price}
      onChange={handleChange}
    /> 
    <button
      onClick={() => {
        if (item.forename && item.age) {
          addItem(item);
          setItem(defaultItem);
          }
        }}
    >
      Add
    </button>
    {items.map ( (item) => (
      <Item 
        key = {item._id}
        _id={item._id}
        name = {item.name}
        price = {item.price}
        />
    ) )}
    </form>
      
    </div>
  );
}

export default App;
