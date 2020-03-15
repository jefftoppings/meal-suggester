import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {map, tap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SPOONACULAR_API_KEY} from '../spoonacular';
import {INTOLERANCES, SearchResponse, SearchResult} from '../constants';

@Injectable()
export class SearchService {

  constructor(private db: AngularFireDatabase, private http: HttpClient) {
  }

  searchDb(value: string): Observable<SearchResult[]> {
    value = value.toLowerCase();
    return this.db.list(`/search/`).valueChanges().pipe(
      map(result => {
        if (result[0][value]) {
          return result[0][value].results;
        }
        return null;
      })
    );
  }

  searchApi(value: string): Observable<SearchResult[]> {
    value = value.toLowerCase();
    const url = 'https://api.spoonacular.com/recipes/search';
    const params: HttpParams = new HttpParams()
      .set('query', value)
      .set('intolerances', INTOLERANCES)
      .set('number', '100')
      .set('instructionsRequired', 'true')
      .set('apiKey', SPOONACULAR_API_KEY);
    return this.http.get<SearchResponse>(url, {params}).pipe(
      tap(result => this.db.list(`/search/search/`).set(value, result)),
      map(result => result.results));
  }
}
