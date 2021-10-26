import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // isAuthenticated = false;
  user: User | null = null;
  private userSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      // this.isAuthenticated = !!user;
      this.user = user;
      console.log(user);
    });
  }

  logOut() {
    this.authService.logOut().subscribe();
    this.user = null;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
