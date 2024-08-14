import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userName: string | null = null;
  role: boolean = false;
  userNameSubscription!: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userNameSubscription = this.authService
      .GetUserSession()
      .subscribe((user) => {
        this.userName = this.authService.GetUserName(user);
        this.role = this.authService.GetUserRole(user);
      });
  }

  ngOnDestroy(): void {
    this.userNameSubscription.unsubscribe();
  }

  logout() {
    this.authService.RemoveUserSession();
    this.router.navigate(['/']);
  }
}
