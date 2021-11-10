import React, { useEffect, useState } from 'react';
import './FoodInProgress.css';

const meals = [{
  idMeal: '52977',
  strMeal: 'Corba',
  strDrinkAlternate: null,
  strCategory: 'Side',
  strArea: 'Turkish',
  strInstructions: 'Pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside.  Fair warning, this will probably turn your lentils into a solid block that you’ll have to break up later\r\nIn a large pot over medium-high heat, sauté the olive oil and the onion with a pinch of salt for about 3 minutes, then add the carrots and cook for another 3 minutes.\r\nAdd the tomato paste and stir it around for around 1 minute. Now add the cumin, paprika, mint, thyme, black pepper, and red pepper as quickly as you can and stir for 10 seconds to bloom the spices. Congratulate yourself on how amazing your house now smells.\r\nImmediately add the lentils, water, broth, and salt. Bring the soup to a (gentle) boil.\r\nAfter it has come to a boil, reduce heat to medium-low, cover the pot halfway, and cook for 15-20 minutes or until the lentils have fallen apart and the carrots are completely cooked.\r\nAfter the soup has cooked and the lentils are tender, blend the soup either in a blender or simply use a hand blender to reach the consistency you desire. Taste for seasoning and add more salt if necessary.\r\nServe with crushed-up crackers, torn up bread, or something else to add some extra thickness.  You could also use a traditional thickener (like cornstarch or flour), but I prefer to add crackers for some texture and saltiness.  Makes great leftovers, stays good in the fridge for about a week.',
  strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  strTags: 'Soup',
  strYoutube: 'https://www.youtube.com/watch?v=VVnZd8A84z4',
  strIngredient1: 'Lentils',
  strIngredient2: 'Onion',
  strIngredient3: 'Carrots',
  strIngredient4: 'Tomato Puree',
  strIngredient5: 'Cumin',
  strIngredient6: 'Paprika',
  strIngredient7: 'Mint',
  strIngredient8: 'Thyme',
  strIngredient9: 'Black Pepper',
  strIngredient10: 'Red Pepper Flakes',
  strIngredient11: 'Vegetable Stock',
  strIngredient12: 'Water',
  strIngredient13: 'Sea Salt',
  strIngredient14: '',
  strIngredient15: '',
  strIngredient16: '',
  strIngredient17: '',
  strIngredient18: '',
  strIngredient19: '',
  strIngredient20: '',
  strMeasure1: '1 cup ',
  strMeasure2: '1 large',
  strMeasure3: '1 large',
  strMeasure4: '1 tbs',
  strMeasure5: '2 tsp',
  strMeasure6: '1 tsp ',
  strMeasure7: '1/2 tsp',
  strMeasure8: '1/2 tsp',
  strMeasure9: '1/4 tsp',
  strMeasure10: '1/4 tsp',
  strMeasure11: '4 cups ',
  strMeasure12: '1 cup ',
  strMeasure13: 'Pinch',
  strMeasure14: ' ',
  strMeasure15: ' ',
  strMeasure16: ' ',
  strMeasure17: ' ',
  strMeasure18: ' ',
  strMeasure19: ' ',
  strMeasure20: ' ',
  strSource: 'https://findingtimeforcooking.com/main-dishes/red-lentil-soup-corba/',
  dateModified: null,
},
];
const ingredientsValue = Object.values(meals[0]);

function FoodInProgress() {
  const [fullIngredient, setFullIngredient] = useState([]);

  function getIngredients() {
    const ingredientsArray = [];
    Object.keys(meals[0]).forEach((element, index) => element.includes('strIngredient')
      && ingredientsArray.push(ingredientsValue[index]));
    return ingredientsArray;
  }

  function getAmountIngredients() {
    const amountIngredientsArray = [];
    Object.keys(meals[0]).forEach((element, index) => element.includes('strMeasure')
    && amountIngredientsArray.push(ingredientsValue[index]));
    return amountIngredientsArray;
  }

  async function getFullIngredients() {
    const ingredients = getIngredients();
    const amountIngredients = getAmountIngredients();

    const fullIngredientsArray = [];
    for (let index = 0; index < ingredients.length; index += 1) {
      if (ingredients[index] !== '' && amountIngredients[index] !== '') {
        fullIngredientsArray.push(amountIngredients[index] + ingredients[index]);
      }
    }
    setFullIngredient(fullIngredientsArray);
  }

  function handleClick({ target }) {
    const li = target.parentNode;

    if (li.className === 'checked') {
      li.classList = '';
    } else {
      li.classList = 'checked';
    }
  }

  useEffect(() => {
    getFullIngredients();
  }, []);
  console.log(fullIngredient);
  return (
    <div>
      <img
        alt={ meals[0].strMeal }
        src={ meals[0].strMealThumb }
        width="200px"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        {meals[0].strMeal}
      </h1>
      <h2 data-testid="recipe-category">{meals[0].strCategory}</h2>
      <ol>
        { fullIngredient.map((element, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            <input type="checkbox" id={ index } onClick={ (event) => handleClick(event) } />
            {' '}
            {element}
          </li>
        ))}
      </ol>
      <div data-testid="instructions">
        {meals[0].strInstructions }
      </div>
      <button type="button" data-testid="share-btn">compartilhar</button>
      <button type="button" data-testid="favorite-btn">favoritar</button>
      <button type="button" data-testid="finish-recipe-btn"> finalizar</button>
    </div>
  );
}

export default FoodInProgress;
