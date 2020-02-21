import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../components/authentication/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeModel } from '../../models/recipe.model'
import { async } from 'q';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userRecipes$: Observable<RecipeModel[]>;
  isCreator: boolean;
  currentUserId: string;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router) { }



  ngOnInit() {
    //this.currentUserId = localStorage.getItem('_id');
    this.userRecipes$ = this.recipeService.getUserRecipes();
  }

  get username() {
    return localStorage.getItem('username');
  }

}
