import React, { useState } from "react";
import axios from "axios";

const AxiosTest = () => {
  const [body, setBody] = useState("initial body");
  const randomData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => {
        setBody(response.data.body);
        console.log(response);
      });
    console.log("button hit");
  };

  const myPost = () => {
    console.log("Hitting our local server:");
    axios.get("http://localhost:4747/").then((res) => console.log(res));
  };
  return (
    <div>
      {" "}
      <h1> Axios Test Page </h1>
      <img src="/logo.png" alt="logo" />
      <div> {body} </div>
      <button onClick={() => randomData()}> hit me </button>
      <button onClick={() => myPost()}> my server </button>
    </div>
  );
};

export default AxiosTest;
