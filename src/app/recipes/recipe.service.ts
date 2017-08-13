import { EventEmitter} from '@angular/core';
import {Recipe} from './recipe.model' ;
import {Ingredient} from '../shared/ingredient.model';
export class RecipeService{
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
      new Recipe('Big Fat Burger', 'A Burger With delicious Patty',
      'https://static.pexels.com/photos/161675/abstract-barbeque-bbq-beauty-161675.jpeg',[
        new Ingredient('Buns',2),
          new Ingredient('Patty',2)]),

  new Recipe('Fries', 'Delicious French Fries With EGG',
  'https://static.pexels.com/photos/62097/pexels-photo-62097.jpeg',[
    new Ingredient('EGGS',3),
      new Ingredient('French Fries',20)
  ]),
    ];
    getRecipes(){
       return this.recipes.slice();
    }

}
