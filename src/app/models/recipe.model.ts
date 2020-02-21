export interface RecipeModel {
        _id: string;
        meal: string;
        ingredients: string;  
        prepMethod: string;
        foodImageURL: string;  
        category: string;   
        categoryImageURL: string;  
        likesCounter: number;
}