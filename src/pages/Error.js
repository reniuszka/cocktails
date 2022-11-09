import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context";

const Error = () => {
  const { error } = useContext(AppContext);
  if (error.length > 0) {
    return (
      <section className="section about-section">
        <h2>a short story about an error</h2>
        <p>{error}</p>
        <Link to="/" className="btn btn-primary">
          Back Home
        </Link>
      </section>
    );
  }
  return (
    <section className="section about-section">
      <h2>a short story about an error</h2>
      <p>There is no such a page. I can see error....</p>
      <Link to="/" className="btn btn-primary">
        Back Home
      </Link>
    </section>
  );
};

export default Error;
