import React from "react";
import { features } from "../assets/data/features";
import Feature from "./Feature";

const Features = () => {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {features.map((feature, index) => (
        <Feature
          key={index}
          icon={feature.icon}
          alt={feature.alt}
          title={feature.title}
          content={feature.content}
        />
      ))}
    </section>
  );
};

export default Features;
