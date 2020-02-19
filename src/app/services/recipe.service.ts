import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IRecipe } from "../interfaces/recipe";
import { Observable } from "rxjs";


const appKey = "kid_BJdp2d8aB" // APP KEY HERE;
const appSecret = "43f9eaccf23d4945a7213b9b12d93a2f" // APP SECRET HERE;
const userId = localStorage.getItem('_id');
const username = localStorage.getItem('username');
let id;//check
const getAllRecipesUrl = ` https://baas.kinvey.com/appdata/${appKey}/recipes`;
const getRecipeByIdUrl = `https://baas.kinvey.com/appdata/${appKey}/recipes/`;

@Injectable()
export class RecipeService {

    selectedRecipe: Observable<IRecipe>;

    constructor(private http: HttpClient) {
    }

    create(model) {
        console.log(model);
        return this.http.post(getAllRecipesUrl, model);
    }
    
    edit(id, model) {
        console.log(id, model);
        return this.http.put(
            `${getAllRecipesUrl}/${id}`,model);
    }
    getUserRecipes(user) {
        return this.http.get(
            `${getAllRecipesUrl}?query={"creator":"${user}"}&sort={"_kmd.ect": -1}`)
    }

    getAllRecipes(): Observable<IRecipe[]>{
        return this.http.get<IRecipe[]>(getAllRecipesUrl);
    }

    getRecipe(id): Observable<IRecipe> {
        return this.http.get<IRecipe>(getRecipeByIdUrl+id);
    }

    delete(id) {
        return this.http.delete(getRecipeByIdUrl+id)
    }


   

}