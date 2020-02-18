import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../../../models/register.model';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../../../validators/custom-validators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: RegisterModel;
  loginFailed: boolean;
  errMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router) {
    this.model = new RegisterModel('', '', '', '', 18)
  }

  form = new FormGroup({
    "username": new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]),
    "password": new FormControl('', [Validators.required,
    new CustomValidators().mustMatch('confirmPassword'), Validators.pattern('[a-zA-Z0-9]+')]),
    "confirmPassword": new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9]+')]),
    "avatarUrl": new FormControl('', [Validators.required]),
    "email": new FormControl('', [Validators.required, Validators.email]),
    "age": new FormControl('', [Validators.required]),
  })

  get diagnostics() {
    return JSON.stringify(this.form.value);
  }

  ngOnInit() {
  }



  register() {
    delete this.model['confirmPassword'];
    this.authService.register(this.model)
      .subscribe(
        data => {
          this.router.navigate(['/login'])
        },
        err => {
          this.form.reset();
          this.loginFailed = true;
          this.errMessage = err['error']['description']
        })
  }

  get f() {
    return this.form.controls;
  }

}
