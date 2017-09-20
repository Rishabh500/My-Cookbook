import { Component, OnInit,OnDestroy } from '@angular/core';
import{Subscription} from 'rxjs/Subscription';

import { Ingredient } from '../shared/ingredient.model';
import {ShoppingService} from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy{
  ingredients:Ingredient[];
private subscription:Subscription;
  constructor(private shoppingService:ShoppingService) { }
ngOnDestroy(){
  this.subscription.unsubscribe();
}
  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredient();
    this.subscription = this.shoppingService.ingredientsChanged.
        subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients = ingredients;
      }
    )
  }
  onEditItem(index:number){
    this.shoppingService.startedEditing.next(index); 
  }

}
