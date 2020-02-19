import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { IRecipe } from '../../../interfaces/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { CustomValidators } from 'src/app/validators/custom-validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  ingredients: FormArray;
  model: IRecipe;
  createFailed: boolean;
  errMessage: string;
  
  constructor(private recipeService: RecipeService, 
              private formBuilder: FormBuilder, 
              private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      meal: ['', [Validators.required, Validators.minLength(4)]],
      //ingredients: this.formBuilder.array([], Validators.required),
      prepMethod: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.minLength(10)]],
      foodImageURL: ['', [Validators.required, Validators.pattern("^(http|https)://")]],
      //category: ['', [Validators.required]],
      //categoryImageURL: ['', [Validators.required]],
    });
  }

  share() {
    this.recipeService.create(this.form.value)
      .subscribe(
        data => {
          this.router.navigate(['/recipes/all'])
        },
        err => {
          console.log(err);
          this.form.reset();
          this.createFailed = true;
          this.errMessage = err['error']['description']
        })
  }

  get f() {
    return this.form.controls;
  }

}
