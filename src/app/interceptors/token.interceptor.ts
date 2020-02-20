import {
    HttpRequest, HttpResponse, HttpHandler
    , HttpEvent, HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../components/authentication/auth.service';
import { Router } from '@angular/router';


const appKey = "kid_BJdp2d8aB" // APP KEY HERE;
const appSecret = "43f9eaccf23d4945a7213b9b12d93a2f" // APP SECRET HERE;

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private router: Router) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        if (request.url.endsWith('login') || request.url.endsWith(appKey)) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                    'Content-Type': 'application/json'
                }
            })
        } else {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
                    'Content-Type': 'application/json'
                }
            })
        }


        return next.handle(request)
            .pipe(tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && request.url.endsWith('login')) {
                    this.successfulLogin(event['body'])
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    switch (err.status) {
                        case 401:
                            this.router.navigate(['/login']);
                            break;
                        case 404:
                            this.router.navigate(['/login']);
                            break;
                    }
                }
            }));
    }

    private successfulLogin(data) {
        // if (data._kmd.roles !== undefined) {
        //     console.log(data._kmd.roles)
        //     localStorage.setItem('isAdmin', 'true');
        // } else {
        //     localStorage.setItem('isAdmin', 'false')
        // }
        this.authService.authToken = data['_kmd']['authtoken'];
        localStorage.setItem('authtoken', data['_kmd']['authtoken']);
        localStorage.setItem('username', data['username']);
        localStorage.setItem('_id', data['_id']);
        this.router.navigate(['/'])
    }

}


