import React from "react";
// import { useGlobalContext } from '../context'
import { useContext, useRef, useEffect } from "react";
import { AppContext } from "../context";

const SearchForm = () => {
  const { setSearchTerm } = useContext(AppContext);
  console.log(setSearchTerm, "setsearchterm");
  const searchValueInput = useRef("");
  //to get focut in the input
  useEffect(() => {
    searchValueInput.current.focus();
  }, []);
  const handleSubmit = (e) => {
    //prevent from reload the page on enter
    e.preventDefault();
  }; //to get the value from the DOM using ref which has a property current to get value
  const searchCocktail = () => {
    setSearchTerm(searchValueInput.current.value);
  };
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">
            search your favourite cocktail
            <input
              type="text"
              ref={searchValueInput}
              onChange={searchCocktail}
            />
          </label>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
