import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute,    private router: Router,) { }
  baseUrl: string = `http://localhost:3001/`;
  jwtToken: string = "";
  ngOnInit(): void {

  }

  onLogin(email: string, password: string) {
    // return this.http.post(this.baseUrl + `/auth/signin`, { email, password })
    // {

    // }
  }

  login() {
    this.router.navigate(['/menu']);
  }

}
