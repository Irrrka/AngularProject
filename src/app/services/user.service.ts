import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


const appKey = "kid_BJdp2d8aB" // APP KEY HERE;
const appSecret = "43f9eaccf23d4945a7213b9b12d93a2f" // APP SECRET HERE;
const userId = localStorage.getItem('_id');
const username = localStorage.getItem('username')
// const userUrl = `https://baas.kinvey.com/user/${appKey}/${userId}`;
const changeUserPass = `https://baas.kinvey.com/rpc/${appKey}/${username}/user-password-reset-initiate`

@Injectable()
export class UserService {
    private currentAuthtoken: string;

    constructor(private http: HttpClient) {
    }


    getUserData(profileId) {
        return this.http.get(`https://baas.kinvey.com/user/${appKey}/${profileId}`);
    }

    getAllUsers() {
        return this.http.get(`https://baas.kinvey.com/group/${appKey}`)
    }

    destroy(Id) {
        return this.http.delete(`https://baas.kinvey.com/user/${appKey}/${Id}`);
    }

}