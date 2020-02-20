import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { AuthService } from '../../authentication/auth.service';
import { RecipeModel } from '../../../models/recipe.model';
import { RecipeModule } from '../recipe.module';

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
    
    this.recipeService.getRecipe(this.id)
    .subscribe(
      data => {
          this.isCreator = this.creatorId === data['_acl']['creator'];
          this.recipe = new RecipeModel(
            data['meal'],
            data['ingredients'],
            data['prepMethod'],
            data['foodImageURL'],
            data['category'],
            data['categoryImageURL'],
          )
          //this.recipe.ingredients
          console.log(this.recipe)
        },
        err => {
          console.log(err)
        }
      )
   
   
  }

  archive() {
    this.recipeService.delete(this.id)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['/'])
        },
        err => {
          console.log(err)
        }
      )
  }
  edit(id) {
    this.router.navigate([`/recipes/${id}/edit/`])
  }



}
