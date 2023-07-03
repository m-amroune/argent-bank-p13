import React from "react";

const Feature = ({ icon, alt, title, content }) => {
  return (
    <div className="feature-item">
      <img className="feature-icon" src={icon} alt={alt} />
      <h3 className="feature-item-title"> {title} </h3>
      <p> {content} </p>
    </div>
  );
};

export default Feature;
