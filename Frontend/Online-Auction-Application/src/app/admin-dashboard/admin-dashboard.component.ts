import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { APIService } from '../Services/api.service';
import { AlertService } from '../Services/alert.service';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  result: any;
  
  constructor(
    private builder: FormBuilder,
    private _alert: AlertService,
    private service: APIService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  loginForm = this.builder.group({
    Email: this.builder.control('', [Validators.required, Validators.email]),
    Password: this.builder.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)])
  });

  Login() {
    if (this.loginForm.valid) {
      this.service.AdminLogin(this.loginForm.value).subscribe({
        next: (item: any) => {
          this.result = item;

          if (this.result && this.result.isAdmin) {
            if (this.result.password === this.loginForm.value.Password) {
              this.auth.CreatingUserSession(this.result);
              this._alert.openSnackBar('Login Successfully');
              this.router.navigate(['/']);
            } else {
              this._alert.openSnackBar('Invalid Email & Password!');
            }
          } else if (this.result.message === "User is not an admin.") {
            this._alert.openSnackBar('User is not an admin!');
          } else {
            this._alert.openSnackBar('Invalid Email & Password!');
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          this._alert.openSnackBar('An unexpected error occurred. Please try again later.');
        }
      });
    }
  }
}
