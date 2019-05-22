import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isActive = false;

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {

  }
  openMenu() {
    this.isActive = this.isActive === true ? false : true;
  }

  closeMenu() {
    this.isActive = this.isActive === false ? true : false;
  }
  logout() {
    return this.fireAuth.auth.signOut().then(() => this.router.navigate(['/']))
  }
}
