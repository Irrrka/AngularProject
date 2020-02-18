import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


const appKey = "kid_BJdp2d8aB" // APP KEY HERE;
const appSecret = "43f9eaccf23d4945a7213b9b12d93a2f" // APP SECRET HERE;
const userId = localStorage.getItem('_id');
const username = localStorage.getItem('username')
const createListingUrl = `https://baas.kinvey.com/appdata/${appKey}/cars`
const getAllCarsUrl = `https://baas.kinvey.com/appdata/${appKey}/cars?query={}&sort={"_kmd.ect": -1}`

@Injectable()
export class ListingService {

    constructor(private http: HttpClient) {
    }

    create(model) {
        return this.http.post(createListingUrl, model);
    }
    
    edit(id, model) {
        console.log(id, model)
        return this.http.put(
            `https://baas.kinvey.com/appdata/${appKey}/cars/${id}`,model);
    }
    getUserListings(user) {
        return this.http.get(
            `https://baas.kinvey.com/appdata/${appKey}/cars?query={"seller":"${user}"}&sort={"_kmd.ect": -1}`)
    }

    getAllListings() {
        return this.http.get(getAllCarsUrl)
    }

    getListingDetails(carId) {
        return this.http.get(`https://baas.kinvey.com/appdata/${appKey}/cars/${carId}`)
    }

    deleteListing(carId) {
        return this.http.delete(`https://baas.kinvey.com/appdata/${appKey}/cars/${carId}`)
    }


   

}