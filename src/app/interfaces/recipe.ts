export interface IRecipe {
    _id: string;
    meal: string;
    ingredients: string[];
    prepMethod: string;
    description: string;
    foodImageURL: string;
    category: string;
    categoryImageURL: string;
}