import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { FormGroup, FormControl, FormBuilder, FormsModule, Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


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
    "foodImageURL": new FormControl('', [Validators.required, Validators.pattern('^(http|https)://')]),
    "category": new FormControl('', [Validators.required]),
    "categoryImageURL": new FormControl('', [Validators.nullValidator]),
  });

  get diagnostics() {
    return JSON.stringify(this.form.value);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.recipeService.getRecipe(this.id)
      .subscribe(
        data => {
          this.recipe = new RecipeModel(
            data['meal'],
            data['ingredients'].join(' '),
            data['prepMethod'],
            data['foodImageURL'],
            data['category'],
            data['categoryImageURL'],
          )},
        err => {
          console.log(err)
        }
      )
  }

  edit() {
    const {meal, ingredients, prepMethod, foodImageURL, category, categoryImageURL } = this.form.value;
    let data = {
      meal,
      ingredients: ingredients.split(' '),
      prepMethod,
      foodImageURL,
      category,
      categoryImageURL
    }

    data.categoryImageURL = categories[category];

      this.recipeService.edit(this.id, this.recipe)
        .subscribe(
          data => {
            //console.log(data)
            this.router.navigate(['/'])
          },
          err => {
            this.editRecipeFailed = true;
            this.errMessage = err['error']['description']
          })
    }

  get f() {
    return this.form.controls;
  }
}
