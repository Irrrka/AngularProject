import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  model: RecipeModel;
  createRecipeFailed: boolean;
  errMessage: string;

  constructor(
    private recipeService: RecipeService,
    private router: Router) {
    this.model = new RecipeModel('', new Array(), '', '', '', '', '')
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
  }

  share() {
    this.recipeService.create(this.model)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['/home'])
        },
        err => {
          console.log(err)
          this.form.reset();
          this.createRecipeFailed = true;
          this.errMessage = err['error']['description']
        })
  }

}
