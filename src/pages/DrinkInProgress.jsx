import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getIngredients } from '../helper/helper';
import { fetchApiByID } from '../services/FetchApi';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import saveDrinkRecipeLocalStorage from '../helper/saveDrinkRecipeLocalStorage';
import setDrinkFavoriteInLocalStorage from '../helper/setFavoriteDrinkInLocalStorage';
import ShareButton from '../components/ShareButton';

function DrinkInProgress({ history }) {
  const [fullIngredient, setFullIngredient] = useState([]);
  const [count, setCount] = useState(0);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [getLocal, setLocal] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [heart, setHeart] = useState(whiteHeartIcon);
  const [toggleHeart, setToggleHeart] = useState(true);
  const { recipeId } = useParams();

  function getFullIngredients(response) {
    const ingredients = getIngredients(response, 'strIngredient');
    const amountIngredients = getIngredients(response, 'strMeasure');
    const fullIngredientsArray = [];
    ingredients.forEach((element, index) => {
      let ingredientAndAmount = '';
      if (element) {
        ingredientAndAmount += element;
      }
      if (amountIngredients[index]) {
        ingredientAndAmount += ` - ${amountIngredients[index]}`;
      }
      fullIngredientsArray.push(ingredientAndAmount);
    });
    setFullIngredient(fullIngredientsArray.filter((element) => element !== ''));
  }

  function countChecked(target) {
    return target.checked ? setCount(count + 1) : setCount(count - 1);
  }

  function setClassNameChecked(target) {
    return target.parentElement.classList.toggle('checked');
  }

  function sendLocalStorage() {
    const exist = localStorage.getItem('inProgressRecipes');
    if (exist) {
      const json = JSON.parse(exist);
      const value = (Object.values(json.cocktails[recipeId] || []));
      setLocal(value || []);
      setCount(value.length);
    }
  }

  function setRecipeLocalStorage(target) {
    setIngredientsList([...ingredientsList, target.name]);
    const id = recipe.idDrink;
    const exist = localStorage.getItem('inProgressRecipes');
    if (exist) {
      const json = JSON.parse(exist);
      localStorage.setItem('inProgressRecipes', JSON.stringify({ ...json,
        cocktails: { ...json.cocktails, [id]: [...ingredientsList, target.name] } }));
      return;
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {
      [id]: [...ingredientsList, target.name] },
    meals: { } }));
  }

  function handleClick({ target }) {
    countChecked(target);
    setClassNameChecked(target);
    const id = recipe.idDrink;
    if (target.checked) {
      setRecipeLocalStorage(target);
      return;
    }
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const value = Object.values(getLocalStorage.cocktails[recipeId])
      .filter((element) => element !== target.name);
    setIngredientsList(value);
    localStorage.setItem('inProgressRecipes', JSON.stringify({ ...getLocalStorage,
      cocktails: { ...getLocalStorage.cocktails, [id]: value } }));
  }

  async function fetchApi() {
    const response = await fetchApiByID(recipeId, false);
    getFullIngredients(response);
    setRecipe(response[0]);
  }

  useEffect(() => {
    fetchApi();
    sendLocalStorage();
    const getRecipe = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const exist = getRecipe.find((element) => element.id === recipeId);
    if (exist) {
      setHeart(blackHeartIcon);
      setToggleHeart(!toggleHeart);
    }
  }, []);

  function handleFinish() {
    saveDrinkRecipeLocalStorage(recipe, recipeId, history);
  }

  function handleFavorite() {
    setToggleHeart(!toggleHeart);
    if (toggleHeart) {
      setHeart(blackHeartIcon);
      setDrinkFavoriteInLocalStorage(recipe, recipeId);
    } else {
      setHeart(whiteHeartIcon);
      const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filtered = getLocalStorage.filter((element) => element.id !== recipeId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
    }
  }

  return (
    <section className="main-section">
      <img
        alt={ recipe.strDrink }
        src={ recipe.strDrinkThumb }
        data-testid="recipe-photo"
        className="detail-image"
      />
      <section className="sub-section">
        <div className="container-btns-title">
          <h1 data-testid="recipe-title">
            {recipe.strDrink}
          </h1>
          <button type="button" onClick={ handleFavorite } className="search-btn">
            <img data-testid="favorite-btn" src={ heart } alt="favoritar" />
          </button>
          <ShareButton path={ `bebidas/${recipeId}` } dataTest="share-btn" />
        </div>
        <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
        <ol>
          { (fullIngredient.map((element, index) => (
            <li
              key={ index }
              className={ getLocal
                .some((currentRecipe) => element === currentRecipe) && 'checked' }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                defaultChecked={ getLocal
                  .some((currentRecipe) => element === currentRecipe) }
                type="checkbox"
                name={ element }
                id={ index }
                onChange={ (event) => handleClick(event) }
              />
              {' '}
              {element}
            </li>)))}
        </ol>
        <div data-testid="instructions">
          {recipe.strInstructions }
        </div>
        <div className="link-btn-footer">
          <button
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ handleFinish }
            className="btn-footer"
            disabled={ count !== fullIngredient.length }
          >
            finalizar
          </button>
        </div>
      </section>
    </section>
  );
}

DrinkInProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default DrinkInProgress;
