export class ListingModel {
    constructor(
        public seller: string,
        public title: string,
        public description: string, 
        public brand: string,  
        public model: string,  
        public year: string,  
        public imageUrl: string,   
        public fuelType: string,  
        public price: string
    ) { }
}