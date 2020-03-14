import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SAMPLE_SEARCH_RESULTS} from '../sample-search';

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
  searchResults$$: BehaviorSubject<SearchResult[]> = new BehaviorSubject<SearchResult[]>(null);

  constructor() {
  }

  get searchResults$(): Observable<SearchResult[]> {
    return this.searchResults$$.asObservable();
  }

  search(value: string) {
    // TODO: make actual API calls when ready
    this.searchResults$$.next(SAMPLE_SEARCH_RESULTS.results);
  }
}
