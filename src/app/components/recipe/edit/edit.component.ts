import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { FormGroup, FormControl, FormBuilder, FormsModule, Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';

const categories = {
  "Vegetables and legumes/beans":"https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg",
  "Fruits":"https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg",
  "Grain Food":"https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg",
  "Milk, cheese, eggs and alternatives":"https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg",
  "Lean meats and poultry, fish and alternatives":"https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg"
};

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  id: string;
  recipe: RecipeModel;
  editRecipeFailed: boolean;
  errMessage: string;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  form = new FormGroup({
    "meal": new FormControl('', [Validators.required, Validators.minLength(4)]),
    "ingredients": new FormControl('', [Validators.required, Validators.minLength(10)]),
    "prepMethod": new FormControl('', [Validators.required, Validators.minLength(10)]),
    "foodImageURL": new FormControl('', [Validators.required]),
    "category": new FormControl('', [Validators.required]),
    "categoryImageURL": new FormControl('', [Validators.nullValidator]),
  });

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = data['id'];
    });
    
    this.recipeService.getRecipe(this.id)
    .subscribe(
      data => {
        //console.log(data);
          this.recipe = data;
        },
        err => {
          //console.log(err)
        }
      )
  }

  edit() {
    console.log(this.form.value)
    const {meal, ingredients, prepMethod, foodImageURL, category, categoryImageURL } = this.form.value;
    let data: RecipeModel;
    data.meal = meal || this.recipe.meal;
    data.ingredients = ingredients || this.recipe.ingredients;
    data.prepMethod = prepMethod || this.recipe.prepMethod;
    data.category = category || this.recipe.category;
    data.categoryImageURL = categories[data.category];
    console.log(data)
    this.recipeService.edit(this.id, data)
        .subscribe(
          res => {
            console.log(res)
            //this.router.navigate(['/home'])
          },
          err => {
            console.log(err)
            //this.editRecipeFailed = true;
            //this.errMessage = err['error']['description']
          })
    }

  get f() {
    return this.form.controls;
  }
}
