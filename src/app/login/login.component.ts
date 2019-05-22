import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  error: string = null;
  credentials = {
    email: '',
    password: ''
  }


  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  enter(event) {
    if (event.keyCode === 13) {
      this.login()
    }
  }
  login() {
    this.authService.login(this.credentials)
      .then(() => this.router.navigate(['/results/']))
      .catch(err => this.error = err);
  }
}
