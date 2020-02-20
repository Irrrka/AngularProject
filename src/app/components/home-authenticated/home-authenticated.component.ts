import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../components/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-authenticated',
  templateUrl: './home-authenticated.component.html',
  styleUrls: ['./home-authenticated.component.css']
})
export class HomeAuthenticatedComponent implements OnInit {
  recipes: Object
  //creatorId: string;
  currentUserId: string;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.currentUserId = localStorage.getItem('_id');

    this.recipeService.getAllRecipes()
      .subscribe(
        data => {
          this.recipes = data;
        },
        err => {
          console.log(err)
        })
  }
 
}
