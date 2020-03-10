import React from "react";
import { useSelector, useDispatch } from "react-redux";

const selectUser = reduxState => {
  return reduxState.user;
};

const selectPizza = reduxState => {
  return [...reduxState.pizzas].sort((a, b) => {
    return b.bought - a.bought;
  });
};

const selectFavorites = reduxState => {
  //console.log(reduxState.user.favorites);
  return reduxState.user.favorites;
};

export default function PizzaList() {
  const user = useSelector(selectUser);
  const pizzas = useSelector(selectPizza);
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  function toggleFavorite(pizzaId) {
    //console.log("what am i?", pizzaId);
    const action = {
      type: "TOGGLE_FAVORITE_PIZZA",
      payload: pizzaId
    };
    dispatch(action);
  }

  return (
    <div>
      <h1>Pizza Explorer</h1>
      <p>
        Welcome back, <strong>{user.name}</strong>! Your favorite pizzas:
      </p>
      <ul>
        {pizzas.map(pizza => {
          const isFavorite = favorites.includes(pizza.id);
          //console.log("FAV?", isFavorite);
          return (
            <li key={pizza.id}>
              <div>
                <h3>{pizza.name}</h3>
                <p>{pizza.description}</p>
                <p>Bought so far: {pizza.bought}</p>
                <button onClick={() => toggleFavorite(pizza.id)}>
                  {isFavorite ? "♥" : "♡"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
