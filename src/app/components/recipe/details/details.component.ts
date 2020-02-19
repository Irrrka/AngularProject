import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IRecipe } from 'src/app/interfaces/recipe';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  recipe: IRecipe;
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(data =>{
      let id = data['_id'];
      console.log(id);
      this.recipeService.getRecipe(id).subscribe((data)=>{
        this.recipe=data;
      });
    })
  }

  archive(id){
    this.recipeService.delete(id);
    this.router.navigate(['/recipes/all']);
  }

}
