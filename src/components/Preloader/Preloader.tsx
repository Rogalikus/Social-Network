import loader from "../img/Loader.svg";
import React from "react";

type PropsType = {};

const Preloader: React.FC<PropsType> = (props) => {
  return <img src={loader} />;
};

export default Preloader;
