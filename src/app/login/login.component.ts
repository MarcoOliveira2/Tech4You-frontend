import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  jwt: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const { email, password } = this.form;
    debugger;
    this.authService.login(email, password).subscribe(
      data => {
        this.jwt = data.token;
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
    console.log(this.jwt);
  }

  reloadPage(): void {
    // window.location.reload();
    this.router.navigate(['menu'])
  }
}