import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../interfaces/user';
import { FormGroup, FormControl, Validator, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: IUser;
  loginFailed: boolean;
  errMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {
  }

 //Refactor
 form = this.fb.group({
  "username": new FormControl('', [Validators.required]),
  "password": new FormControl('', [Validators.required]),
});

  ngOnInit() {
  }

  get diagnostics() {
    return JSON.stringify(this.form.value);
  }


  login() {
    this.authService.login(this.form.value)
  
      .subscribe((data) => {
        console.log(data)
          localStorage.setItem('authtoken', data['_kmd']['authtoken']);
          localStorage.setItem('_id', data['_id']);
          localStorage.setItem('username', data['username']);
          this.router.navigate(['/home']);
        },
        err => {
          this.form.reset();
          this.loginFailed = true;
          this.errMessage = err['error']['description']
        })
  }

  get f () {
    return this.form.controls;
  }


}
