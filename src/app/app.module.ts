import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecipeSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
