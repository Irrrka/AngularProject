import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  recipes: Object
  userData: Object
  creatorId: string;


  constructor(
    private userService: UserService,
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.creatorId = localStorage.getItem('_id');

    this.userService.getUserData(localStorage.getItem('_id'))
      .subscribe(data => {
        this.userData = data
        //refactor
        this.recipeService.getRecipe(this.userData['username'])
          .subscribe(
            data => {
              console.log(data)
              this.recipes = data;
              console.log(this.recipes)
            },
            err => {
              console.log(err)
            })
      }, err => {
        console.log(err)
      })


  }

  get username() {
    return localStorage.getItem('username')
  }

  destroy() {
    this.userService.destroy(this.userData['_id'])
      .subscribe(
        data => {
          localStorage.clear();
          this.router.navigate(['/login'])
        },
        err => {
          console.log(err)
        })
  }
//check
  delete(id) {
    this.recipeService.delete(id)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['/home'])
        },
        err => {
          console.log(err)
        }
      )
  }
  edit(id) {
    this.router.navigate(['/edit', id])
  }
}
