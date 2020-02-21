import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { AuthService } from '../../authentication/auth.service';
import { RecipeModel } from '../../../models/recipe.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  id: string;
  recipe: RecipeModel;
  creatorId: string;
  isCreator: boolean;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.creatorId = localStorage.getItem('_id');
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    //console.log(this.id)
    this.recipeService.getRecipe(this.id)
    .subscribe(
      data => {
        //console.log(data)
          this.isCreator = this.creatorId === data['_acl']['creator'];
          const { meal, ingredients, prepMethod, foodImageURL, category, categoryImageURL} = data;
          this.recipe = data;
          //console.log(this.recipe)
        },
        err => {
          console.log(err)
        }
      );
      //WHY ундефинед????
      //console.log(this.recipe)
  }

  archive() {
    this.recipeService.delete(this.id)
      .subscribe(
        data => {
          //console.log(data)
          this.router.navigate(['/home'])
        },
        err => {
          console.log(err)
        }
      )
  }

  edit() {
    this.router.navigate([`/recipes/${this.id}/edit/`])
  }
}
