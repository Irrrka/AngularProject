export class RecipeModel {
    constructor(
        //public _id: string,
        public meal: string,
        public ingredients: string,  
        public prepMethod: string,
        public foodImageURL: string,  
        public category: string,   
        public categoryImageURL: string,  
    ) { }
}