import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { FormGroup, FormControl, Validator, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

const categories = {
  "Vegetables and legumes/beans":"https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg",
  "Fruits":"https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg",
  "Grain Food":"https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg",
  "Milk, cheese, eggs and alternatives":"https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg",
  "Lean meats and poultry, fish and alternatives":"https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg"
};

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  form: FormGroup;
  model: RecipeModel;
  createRecipeFailed: boolean;
  errMessage: string;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form =this.fb.group({
      "meal": ['', [
        Validators.required, Validators.minLength(4)]],
      "ingredients": ['', [Validators.required, Validators.minLength(10)]],
      "prepMethod": ['', [Validators.required, Validators.minLength(10)]],
      "foodImageURL": ['', [Validators.required]],
      "category": ['', [Validators.required]],
      "categoryImageURL": ['', [Validators.nullValidator]],
    });
    //console.log(this.form)
  }

  share() {
    //console.log(this.form.controls)
    const {meal, ingredients, prepMethod, foodImageURL, category, categoryImageURL, likesCounter } = this.form.value;
    let data = {
      meal,
      ingredients: ingredients.split(' '),
      prepMethod,
      foodImageURL,
      category,
      categoryImageURL,
      likesCounter,
    }

    data.categoryImageURL = categories[category];
    data.likesCounter = 0;

    this.recipeService.create(data)
      .subscribe(
        res => {
          //console.log(res)
          this.router.navigate(['/home'])
        },
        err => {
          this.form.reset();
          this.createRecipeFailed = true;
          this.errMessage = err['error']['description']
        })
  }

  get f() {
    return this.form.controls;

  }

  get invalid() {
    return this.form.invalid;
  }

}
