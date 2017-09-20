import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import { Ingredient } from '../../shared/ingredient.model';
import {ShoppingService} from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
subscription:Subscription;
@ViewChild('f') slForm:NgForm;
  //@Output() ingredientAdded = new EventEmitter<Ingredient>();
editmode=false;
editedItem:number;
editedIngredient:Ingredient;

  constructor(private shoppingService:ShoppingService) { }

  ngOnInit() {
    this.shoppingService.startedEditing.subscribe(
      (index:number)=>{
        this.editedItem = index;
        this.editmode = true;
        this.editedIngredient = this.shoppingService.getIngredientArr(index);
        this.slForm.setValue({
          name:this.editedIngredient.name,
          amount:this.editedIngredient.amount
        })
      }
    );
  }
  ngOnDestroy(){
      this.shoppingService.startedEditing.unsubscribe();
  }
  onAddItem(form:NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editmode){
      this.shoppingService.updateIngredient(this.editedItem,newIngredient);
    }
    else{
        this.shoppingService.addIngredient(newIngredient);
    }
    this.editmode =false;
    form.reset();
    //this.ingredientAdded.emit(newIngredient);
  }
onClear(){
  this.slForm.reset();
  this.editmode = false;
}
onDelete(){
  this.shoppingService.deleteIngredient(this.editedItem);
  this.onClear();

}
}
