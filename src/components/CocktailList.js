import React from "react";
import { useContext } from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import Error from "../pages/Error";
import { AppContext } from "../context";
// import { useGlobalContext } from '../context'

const CocktailList = () => {
  const { cocktails, loading, error } = useContext(AppContext);
  console.log(cocktails, "cocktails");
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  //when empty array
  if (cocktails.length < 1) {
    return (
      <h2 className="section-title">
        no cocktails matched your search criteria
      </h2>
    );
  }
  return (
    <section className="section">
      <h2 className="section-title">cocktails</h2>
      <div className="cocktails-center">
        {cocktails.map((cocktail) => {
          console.log(cocktail, "cocktail details");
          // const { id, name, image, info, glass } = cocktail;
          return <Cocktail key={cocktail.id} {...cocktail} />;
        })}
      </div>
    </section>
  );
};

export default CocktailList;
