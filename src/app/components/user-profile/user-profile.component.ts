import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '../../services/user.service';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  id: string;
  userData: Object;
  carsData: Object;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'] //log the value of id
    });

    this.userService.getUserData(this.id)
      .subscribe(data => {
        this.userData = data;
        console.log(this.userData)
        //check
        this.recipeService.getRecipe(this.userData['username'])
          .subscribe(
            data => {
              this.carsData = data;

            },
            err => {
              console.log(err)
            })
      }, err => {
        console.log(err)
      })
  }

  destroy() {
    this.userService.destroy(this.userData['_id'])
      .subscribe(
        data => {
          this.router.navigate(['/userDeleted'])
        },
        err => {
          console.log(err)
        })
  }

}
