import {Component} from '@angular/core';
import {AuthService, User} from './services/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'meal-suggester';
  user$: Observable<User>;

  constructor(private auth: AuthService) {
    this.user$ = auth.user$;
  }

  signOut() {
    this.auth.signOut();
  }

  loginWithGoogle() {
    this.auth.googleSignIn();
  }
}
