import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isActive = false;

  constructor() { }

  ngOnInit() {

  }
  openMenu() {
    this.isActive = this.isActive === true ? false : true;
  }

  closeMenu() {
    this.isActive = this.isActive === false ? true : false;
  }
}
