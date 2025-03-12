import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ShoppinglistService } from './services/shoppinglist.service';
import { Shoppinglist } from './models/Shoppinglist';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ShoppinglistActions } from './state/shoppinglist.actions';
import { Observable } from 'rxjs';
import { selectShoppinglists } from './state/shoppinglist.selectors';
import { AppState } from './state/appState';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink, CommonModule],
    templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
    shoppinglistService = inject(ShoppinglistService)

    shoppinglists$: Observable<ReadonlyArray<Shoppinglist>>;

    constructor(private store: Store<AppState>) {
        this.shoppinglists$ = this.store.select(selectShoppinglists)
    }

    ngOnInit(): void {
        this.store.dispatch(ShoppinglistActions.loadShoppinglists())
    }
}