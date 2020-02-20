import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { FormGroup, FormControl, FormBuilder, FormsModule, Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: string;
  recipeInfo: object;
  recipe: RecipeModel;
  editRecipeFailed: boolean;
  errMessage: string;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) {
  }


  form = new FormGroup({
    "meal": new FormControl('', [Validators.required]),
    "ingredients": new FormControl(''),
    "description": new FormControl(''),
    "prepMethod": new FormControl(''),
    "category": new FormControl(''),
    "foodImageURL": new FormControl(''),
    "categoryImageURL": new FormControl(''),
  });



  get diagnostics() {
    return JSON.stringify(this.form.value);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // console.log(params)
      this.id = params['id'] //log the value of id
      // console.log(this.title)
    });

    this.recipeService.getRecipe(this.id)
      .subscribe(
        data => {
          console.log('data')
          this.recipe = new RecipeModel(
              data['meal']
            , data['ingredients']
            , data['description']
            , data['prepMethod']
            , data['category']
            , data['categoryImageURL']
            , data['foodImageURL']
          )},
        err => {
          console.log(err)
        }
      )
  }

  edit() {
    this.recipeService.edit(this.id, this.recipe)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['/home'])
        },
        err => {
          console.log(err)
          this.editRecipeFailed = true;
          this.errMessage = err['error']['description']
        })
  }

}
