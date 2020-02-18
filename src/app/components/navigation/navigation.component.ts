import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private checkIfAdmin: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  
  }
  get avatar() {
    return localStorage.getItem('avatarUrl')
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
