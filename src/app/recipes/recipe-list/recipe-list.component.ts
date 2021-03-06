import { Component, OnInit, EventEmitter, Output,OnDestroy } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  //@Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];

  constructor(private recipeService : RecipeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeService.recipeChanged.subscribe(
      (recipes:Recipe[])=>{
      this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes(); //This Will Provide Copy of recipe array from service..
  }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  /*onRecipeSelected(recipe: Recipe) {
   this.recipeWasSelected.emit(recipe);
 }*/

}
