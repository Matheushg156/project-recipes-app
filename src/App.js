import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './Context/RecipesProvider';
import Login from './pages/Login';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreDrinksByIngredient from './pages/ExploreDrinksByIngredient';
import ExploreFoodsByIngredient from './pages/ExploreFoodsByIngredient';
import Foods from './pages/Foods';
import DetailsFoodRecipe from './pages/DetailsFoodRecipe';
import Drink from './pages/Drinks';
import DetailsDrinkRecipe from './pages/DetailsDrinkRecipe';
import Profile from './pages/Profile';
import FavoritesRecipes from './pages/FavoritesRecipes';
import RecipesMade from './pages/RecipesMade';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import ExploreFoodsByOrigin from './pages/ExploreFoodsByOrigin';
import NotFound from './pages/NotFound';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route path="/perfil" component={ Profile } />
        <Route path="/receitas-feitas" component={ RecipesMade } />
        <Route path="/receitas-favoritas" component={ FavoritesRecipes } />
        <Route
          path="/bebidas/:recipeId/in-progress"
          component={ DrinkInProgress }
        />
        <Route path="/bebidas/:recipeId" component={ DetailsDrinkRecipe } />
        <Route exact path="/bebidas" component={ Drink } />
        <Route path="/comidas/:recipeId/in-progress" component={ FoodInProgress } />
        <Route path="/comidas/:recipeId" component={ DetailsFoodRecipe } />
        <Route exact path="/comidas" component={ Foods } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodsByIngredient }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinksByIngredient }
        />
        <Route path="/explorar/bebidas/area" component={ NotFound } />
        <Route path="/explorar/comidas/area" component={ ExploreFoodsByOrigin } />
        <Route path="/explorar/comidas" component={ ExploreFood } />
        <Route path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
