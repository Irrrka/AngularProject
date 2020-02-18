import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { ListingService } from '../../services/listing.service';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  carsData: Object
  userData: Object
  creatorId: string;


  constructor(
    private userService: UserService,
    private listingService: ListingService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.creatorId = localStorage.getItem('_id');

    this.userService.getUserData(localStorage.getItem('_id'))
      .subscribe(data => {
        this.userData = data
        this.listingService.getUserListings(this.userData['username'])
          .subscribe(
            data => {
              console.log(data)
              this.carsData = data;
              console.log(this.carsData)
            },
            err => {
              console.log(err)
            })
      }, err => {
        console.log(err)
      })


  }

  get username() {
    return localStorage.getItem('username')
  }

  get avatar() {
    return localStorage.getItem('avatarUrl')
  }


  destroy() {
    this.userService.destroy(this.userData['_id'])
      .subscribe(
        data => {
          localStorage.clear();
          this.router.navigate(['/login'])
        },
        err => {
          console.log(err)
        })
  }

  deleteListing(id) {
    this.listingService.deleteListing(id)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['/listingDeleted'])
        },
        err => {
          console.log(err)
        }
      )
  }
  editListing(id) {
    this.router.navigate(['/editListing', id])
  }
}
