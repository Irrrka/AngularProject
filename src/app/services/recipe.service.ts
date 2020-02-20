import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


const appKey = "kid_BJdp2d8aB" // APP KEY HERE;
const appSecret = "43f9eaccf23d4945a7213b9b12d93a2f" // APP SECRET HERE;
const userId = localStorage.getItem('_id');
const username = localStorage.getItem('username');
let id;//check
const getAllRecipesUrl = `https://baas.kinvey.com/appdata/${appKey}/recipes`;
const getRecipeByIdUrl = `https://baas.kinvey.com/appdata/${appKey}/recipes/${id}`;

@Injectable()
export class RecipeService {

    constructor(private http: HttpClient) {
    }

    getAllRecipes() {
        return this.http.get(getAllRecipesUrl);
    }

    getRecipe(id) {
        return this.http.get(`${getAllRecipesUrl}/${id}`)
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

    delete(id) {
        return this.http.delete(`${getAllRecipesUrl}/${id}`)
    }

}