export class RecipeModel {
    constructor(
        public meal: string,
        public ingredients: string,  
        public description: string, 
        public prepMethod: string,
        public categoryImageURL: string,  
        public foodImageURL: string,  
        public category: string,   
    ) { }
}