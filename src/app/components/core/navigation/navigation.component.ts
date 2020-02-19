import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  console.log(this.authService.checkIfLogged());
  }
  get username() {
    return localStorage.getItem('username');
  }

  get isAuthenticated(){
    return this.authService.checkIfLogged();
  }

  logout() {
    this.authService.logout()
      .subscribe(data => {
        localStorage.clear();
        this.authService.authToken = "";
        this.router.navigate(['/login'])
        // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      })
  }
}
