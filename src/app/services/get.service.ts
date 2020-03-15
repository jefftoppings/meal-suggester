import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {GetResponse} from '../constants';
import {map, switchMap} from 'rxjs/operators';
import {SPOONACULAR_API_KEY} from '../spoonacular';

@Injectable()
export class GetService {

  constructor(private db: AngularFireDatabase, private http: HttpClient) {
  }

  private getDb(id: number): Observable<GetResponse> {
    return this.db.list(`/get/`).valueChanges().pipe(
      map(result => result[0][id])
    );
  }

  private getApi(id: number): Observable<GetResponse> {
    return of(null);
  }

  getRecipe(id: number): Observable<GetResponse> {
    return this.getDb(id).pipe(
      switchMap(recipe => {
        if (recipe) {
          return of(recipe);
        }
        return this.getApi(id);
      })
    );
  }
}
