import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchResult, SearchService} from '../services/search.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss'],
  providers: [SearchService]
})
export class RecipeSearchComponent implements OnInit, OnDestroy {
  searchResults$: Observable<SearchResult[]>;
  resultsShown = 10;

  private subscriptions: Subscription[] = [];

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
  }

  searchForRecipes(value: string) {
    this.searchResults$ = this.searchService.search(value);
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
