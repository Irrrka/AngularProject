import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../../../validators/custom-validators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerFailed: boolean;
  errMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

    //Refactor
    form = new FormGroup({
      "username": new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]),
      "password": new FormControl('', [Validators.required,
                                      new CustomValidators().mustMatch('confirmPassword'), 
                                      Validators.pattern('[a-zA-Z0-9]+')]),
      "confirmPassword": new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9]+')]),
    });

  get diagnostics() {
    return JSON.stringify(this.form.value);
  }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.form.value)
      .subscribe(() => {
          this.router.navigate(['/signin'])
        },
        err => {
          this.form.reset();
          this.registerFailed = true;
          this.errMessage = err['error']['description']
        })
  }

  get f() {
    return this.form.controls;
  }

}
