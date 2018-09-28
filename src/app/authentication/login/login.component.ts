import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cit-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  public loading = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() { }

  onSubmit() {
    this.loading = true;
    this.authService.login(
      this.loginForm.controls['username'].value,
      this.loginForm.controls['password'].value)
      .subscribe(result => {
        this.loading = false;
        if (result) {
          this.router.navigate(['/home']);
        } else {
          console.log('wrong username and/or password!');
        }
      });
  }
}
