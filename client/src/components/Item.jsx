import React from "react"; 

function Item(props) { 
    const { name, price } = props; 

    return( 
        <div> 
        <h3> {name, " costs ", price, " dollars."} </h3>
        </div>

    );
}

export default Item;