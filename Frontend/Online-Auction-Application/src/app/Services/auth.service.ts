import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<string | null>(sessionStorage.getItem('user'));

  constructor() { }

  CreatingUserSession(user: any) {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(JSON.stringify(user));
  }

  RemoveUserSession() {
    sessionStorage.removeItem('user');
    this.userSubject.next(null);
  }

  GetUserSession(): Observable<string | null> {
    return this.userSubject.asObservable();
  }

  GetUserName(user: string | null): string | null {
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser?.name?.toUpperCase() || null;
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  }

  GetId(): number {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.userId;
    }
    return 0; // Default return if user data is not found
  }

  isloggedin(): boolean {
    return sessionStorage.getItem('user') != null;
  }

  GetUserRole(user: string | null): boolean {
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        const name = parsedUser?.name?.toUpperCase();
        return name === "ADMIN1" || name === "ADMIN2";
      } catch (error) {
        console.error('Error parsing user data:', error);
        return false;
      }
    }
    return false;
  }
}
