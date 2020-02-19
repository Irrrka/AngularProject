import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../components/authentication/auth.service';
import { Router } from '@angular/router';
import { IRecipe } from 'src/app/interfaces/recipe';

@Component({
  selector: 'app-home-authenticated',
  templateUrl: './home-authenticated.component.html',
  styleUrls: ['./home-authenticated.component.css']
})
export class HomeAuthenticatedComponent implements OnInit {
  //TODO
  recipes: IRecipe[]
  creatorId: string;
  currentUserId: string;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.recipeService.getAllRecipes()
      .subscribe(
        data => {
          console.log(data)
          this.currentUserId = localStorage.getItem('_id');
        },
        err => {
          console.log(err)
        })
  }

  recipeInfo(id) {
    //this.router.navigate(['/listingDetails', id])
  }

  // listingCreator(creatorId) {
  //   if (creatorId === localStorage.getItem('_id')) {
  //     this.router.navigate(['/userPanel'])
  //   } else {
  //     this.router.navigate(['/userProfileDetails', creatorId])
  //   }
  // }
  // deleteListing(id) {
  //   this.recipeService.delete(id)
  //     .subscribe(
  //       data => {
  //         console.log(data)
  //         this.router.navigate(['/home'])
  //       },
  //       err => {
  //         console.log(err)
  //       }
  //     )
  // }
  // editListing(id) {
  //   this.router.navigate(['/editListing', id])
  // }

}
