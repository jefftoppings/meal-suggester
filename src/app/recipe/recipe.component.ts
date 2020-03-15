import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {GetService} from '../services/get.service';
import {GetResponse} from '../constants';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  providers: [GetService]
})
export class RecipeComponent implements OnInit, OnDestroy {
  recipe$: Observable<GetResponse>;

  private subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, private getService: GetService) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.paramMap.pipe(
        map(params => parseInt(params.get('id'), 10))
      ).subscribe(recipeId => {
        if (recipeId) {
          this.recipe$ = this.getService.getRecipe(recipeId);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
