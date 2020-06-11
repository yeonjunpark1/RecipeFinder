import React from 'react';
import style from './recipe.module.css';

const Recipe = ({ title, calories, image, ingredients, health, amount }) => {
  return (
    <div>
      <h1 className={style.recipe}>{title}</h1>
      <p>{health}</p>
      <ul>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ul>
      <p>Calories: {Math.ceil(calories)}</p>
      <p>Servings: {amount}</p>
      <img src={image} alt='' />
    </div>
  );
};

export default Recipe;
