import React from "react";
import { NavLink } from "react-router-dom";
import ErrorImg from "../assets/img/error.png";

const NotFound = () => {
  return (
    <div className="error-page">
      <h1>
        <img src={ErrorImg} />
      </h1>

      <h2 className="error-message">
        Oups! La page que vous demandez n'existe pas.
      </h2>
      <p className="error-message">
        <NavLink to="/">Retourner sur la page d'accueil</NavLink>
      </p>
    </div>
  );
};

export default NotFound;
