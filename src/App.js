import React, { Component, useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () =>{
  const APP_ID = '92d97b66';
  const APP_KEY = 'b26e0de4bf17e98836b3f1cde482b189';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState([""]);
  const [query, setQuery] = useState('chicken');

  useEffect(() =>{
    getRecipes();
  }, [query])

  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e =>{
    setSearch(e.target.value);
    console.log(search);
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }
  
  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input type="text" className="search-bar" value={search} onChange={updateSearch}/>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="recipes">
        {
          recipes.map(
            recipe=>(
              <Recipe 
                key = {recipe.recipe.label}
                title={recipe.recipe.label} 
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
              />
            )
          )
        }
      </div>
    </div>
  )

}

export default App;
