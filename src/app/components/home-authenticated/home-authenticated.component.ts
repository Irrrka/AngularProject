import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../components/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-authenticated',
  templateUrl: './home-authenticated.component.html',
  styleUrls: ['./home-authenticated.component.css']
})
export class HomeAuthenticatedComponent implements OnInit {
  carsData: Object
  creatorId: string;
  currentUserId: string;

  constructor(
    private listingService: ListingService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.listingService.getAllListings()
      .subscribe(
        data => {
          this.carsData = data;
          this.currentUserId = localStorage.getItem('_id');
        },
        err => {
          console.log(err)
        })
  }

  listingDetails(id) {
    this.router.navigate(['/listingDetails', id])
  }

  listingCreator(creatorId) {
    if (creatorId === localStorage.getItem('_id')) {
      console.log('yeah')
      this.router.navigate(['/userPanel'])
    } else {
      this.router.navigate(['/userProfileDetails', creatorId])
    }
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
