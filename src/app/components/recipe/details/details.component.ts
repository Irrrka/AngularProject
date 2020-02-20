import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  id: string;
  recipe: Object;
  creatorId: string;
  isCreator: boolean;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'] 
    });
    this.creatorId = localStorage.getItem('_id');
 
   
    this.recipeService.getRecipe(this.id)
      .subscribe(
        data => {
          this.isCreator = localStorage.getItem('_id') === data['_acl']['creator'];
          this.recipe = data;
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
    this.router.navigate([`/recipe/${id}/edit/`, id])
  }



}
