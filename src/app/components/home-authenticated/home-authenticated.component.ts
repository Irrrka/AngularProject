import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../components/authentication/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeModel } from '../../models/recipe.model'

@Component({
  selector: 'app-home-authenticated',
  templateUrl: './home-authenticated.component.html',
  styleUrls: ['./home-authenticated.component.css']
})
export class HomeAuthenticatedComponent implements OnInit {
  recipes$: Observable<RecipeModel[]>
  //creatorId: string;
  currentUserId: string;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.currentUserId = localStorage.getItem('_id');

    this.recipes$ = this.recipeService.getAllRecipes();
  }
}
