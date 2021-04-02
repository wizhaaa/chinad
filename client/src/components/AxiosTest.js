import React from "react";
import axios from "axios";

const AxiosTest = () => {
  const randomData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => {
        console.log(res);
      })
      .then((json) => console.log(json));
    console.log("button hit");
  };
  return (
    <div>
      {" "}
      <h1> Axios Test Page </h1>
      <img src="/logo.png" alt="logo" />
      <div> Body </div>
      <button onClick={() => randomData()}> hit me </button>
    </div>
  );
};

export default AxiosTest;
