import React, { useEffect, useState } from 'react';
import Recipe from './recipe';
import './App.css';

//Edamam API
const App = () => {
  const APP_ID = process.env.APP_ID;
  const APP_KEY = process.env.APP_KEY;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('salad');
  const [preference, setPreference] = useState('');

  const updatePreference = (e) => {
    setPreference(e.target.value);
  };

  const getRecipes = async () => {
    if (preference === '') {
      console.log(preference);
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits);
    } else {
      console.log(preference);
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&health=${preference}`
      );
      const data = await response.json();
      if (data.hits.length < 0) {
        const response = await fetch(
          `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        const data = await response.json();
        setRecipes(data.hits);
      } else {
        setRecipes(data.hits);
      }
    }
  };

  useEffect(() => {
    getRecipes();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <html>
      <div className='App'>
        <form onSubmit={getSearch} className='search-form'>
          <input
            className='search-bar'
            type='text'
            placeholder='Search Recipes'
            value={search}
            onChange={updateSearch}
          />
          <button className='search-button' type='submit'>
            Search
          </button>
          <select
            onChange={updatePreference}
            className='dropdown_menu'
            name='abc'
            id='ddmenu'
          >
            <option value='everything'></option>
            <option value='vegan'>Vegan</option>
            <option value='fat-free'>Fat Free</option>
            <option value='vegetarian'>Vegetarian</option>
            <option value='gluten-free'>Gluten Free</option>
            <option value='dairy-free'>Dairy Free</option>
          </select>
        </form>
        <div id='disclaimer'>
          <p>All Recipe Data is Powered by Edamam API</p>
        </div>

        <div className='recipes'>
          {recipes.map((recipe) => (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
              health={recipe.recipe.healthLabels}
              amount={recipe.recipe.yield}
            />
          ))}
          ;
        </div>
      </div>
    </html>
  );
};
export default App;
