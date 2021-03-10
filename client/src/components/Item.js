import React, {useState} from "react"

function Item() {
  return (
    <div className="item">
      <h1>Fried Rice</h1> 
      <img src="https://www.seriouseats.com/recipes/images/2016/01/20160206-fried-rice-food-lab-68-1500x1125.jpg" alt="fried rice"></img>
      <div> Stir fried white rice!</div>
      <div> Chicken Pork Beef Shrimp Vegetable</div>

      <button> add </button>
    </div>
  );
}

export default Item;
