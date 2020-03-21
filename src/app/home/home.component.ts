import {Component, OnInit} from '@angular/core';
import {AuthService, User} from '../services/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user$: Observable<User>;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.user$ = this.authService.user$;
  }
}
