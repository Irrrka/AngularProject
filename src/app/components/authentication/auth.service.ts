import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { IUser } from "../../interfaces/user";


const appKey = "kid_BJdp2d8aB" // APP KEY HERE;
const appSecret = "43f9eaccf23d4945a7213b9b12d93a2f" // APP SECRET HERE;
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;


@Injectable()
export class AuthService {
    private currentAuthtoken: string;

    constructor(private http: HttpClient) {

    }

    login(model: IUser) {
        return this.http.post(loginUrl,
            JSON.stringify(model));
    }

    register(model: IUser) {
        return this.http.post(registerUrl,
            JSON.stringify(model));

    }

    logout() {
        return this.http.post(logoutUrl,
            {});
    }

    checkIfLogged() {
        return this.currentAuthtoken === localStorage.getItem('authtoken');
    }

    get authToken() {
        return localStorage.getItem('authtoken');
    }

    set authToken(value: string) {
        this.currentAuthtoken = localStorage.getItem('authtoken');
    }

}