import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../services/search.service';
import {Observable, Subscription} from 'rxjs';
import {SearchResult} from '../constants';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss'],
  providers: [SearchService]
})
export class RecipeSearchComponent implements OnInit, OnDestroy {
  searchResults$: Observable<SearchResult[]>;
  resultsShown = 10;
  initialSearchValue: string;

  private subscriptions: Subscription[] = [];

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.initialSearchValue = localStorage.getItem('lastSearch');
    if (this.initialSearchValue) {
      this.searchForRecipes(this.initialSearchValue);
    }
  }

  searchForRecipes(value: string) {
    this.searchResults$ = this.searchService.search(value);
    localStorage.setItem('lastSearch', value);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  buildImageUrl(id: number) {
    return 'https://spoonacular.com/recipeImages/' + id.toString() + '-312x231.jpg';
  }

  loadMore() {
    this.resultsShown += 10;
  }

  canLoadMore(totalResults: number): boolean {
    return this.resultsShown < totalResults;
  }
}
