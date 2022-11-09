import React, { useState, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //we have 3 tasks (states to perform)
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);
  const [error, setError] = useState("");
  // there was a warning: eact Hook useEffect has a missing dependency: 'fetchDrinks'. Either include it or remove the dependency array
  // warning, we simply set up the use callback.
  // So we go here with use and then callback hook where essentially we're saying, you know what, only
  // if something changes about this function.
  // So essentially only if the search term changes then create it from scratch.
  // If it doesn't, then don't create it from scratch.
  // And then of course we can add it to dependency array.
  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      console.log(response, "response");
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        //to get acces to this array
        const { drinks } = data;
        console.log("drinks", drinks);
        if (drinks) {
          // setCocktails(drinks); - want to fetch only a few properties and set new names
          const newCocktails = drinks.map((item) => {
            const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
              item;
            return {
              id: idDrink,
              name: strDrink,
              image: strDrinkThumb,
              info: strAlcoholic,
              glass: strGlass,
            };
          });
          setCocktails(newCocktails);
        } else {
          setCocktails([]);
        }
      } else {
        setError("sth went wrong - check your url");
        throw new Error("check your url");
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);

  return (
    <AppContext.Provider value={{ loading, cocktails, setSearchTerm, error }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use here or in the searchform (component)
// export const useGlobalContext = () => {
//   return useContext(AppContext);
// };

export { AppContext, AppProvider };
