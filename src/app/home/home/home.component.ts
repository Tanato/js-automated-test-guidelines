import { Component, OnInit } from '@angular/core';
import { User } from '../../authentication/user';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cit-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.authService.user.subscribe(result => {
      this.user = result;
    });
  }
}
