import { Component, OnInit, Input } from '@angular/core';

import {RecipeService} from '../recipe.service';
import { Recipe } from '../recipe.model';
import {ActivatedRoute,Router} from '@angular/router';
import {Params} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  id:number;
  constructor(private route:ActivatedRoute,
  private recipeService:RecipeService,
  private router:Router ) { }

  ngOnInit() {
  //   const id = this.route.snapshot.params['id'];
  this.route.params.subscribe(
    (params:Params)=>{
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
    }
  )
 }
 onEditRecipe(){
  this.router.navigate(['edit'],{relativeTo: this.route});
 }
onDeleteRecipe(){
  this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
}

}
