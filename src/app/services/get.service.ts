import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {GetResponse} from '../constants';
import {map, switchMap, tap} from 'rxjs/operators';
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
    const url = `https://api.spoonacular.com/recipes/${id}/information`;
    const params: HttpParams = new HttpParams()
      .set('apiKey', SPOONACULAR_API_KEY);
    return this.http.get<GetResponse>(url, {params}).pipe(
      tap(result => this.db.list(`/get/get/`).set(id.toString(), result)),
    );
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
