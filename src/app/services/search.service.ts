import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SAMPLE_SEARCH_RESULTS} from '../sample-search';
import {AngularFireDatabase} from '@angular/fire/database';
import {map, tap} from 'rxjs/operators';

export interface SearchResponse {
  results: SearchResult[];
  baseUri: string;
  offset: number;
  number: number;
  totalResults: number;
  processingTimeMs: number;
  expires: number;
}

export interface SearchResult {
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  image: string;
  imageUrls: string[];
}

@Injectable()
export class SearchService {

  constructor(private db: AngularFireDatabase) {
  }

  search(value: string): Observable<SearchResult[]> {
    return this.db.list(`/search/`).valueChanges().pipe(
      map(result => {
        if (result[0][value]) {
          return result[0][value].results;
        } else {
          // TODO: make actual API call
          return null;
        }
      })
    );
  }
}
