import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/interfaces/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  recipes$: Observable<IRecipe[]>;
  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.recipes$ = this.recipeService.getAllRecipes();
  }

}
