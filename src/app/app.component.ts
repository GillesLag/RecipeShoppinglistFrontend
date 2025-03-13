import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Shoppinglist } from './models/Shoppinglist';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ShoppinglistActions } from './state/actions/shoppinglist.actions';
import { Observable } from 'rxjs';
import { selectShoppinglists } from './state/selectors/shoppinglist.selectors';
import { AppState } from './state/appState';
import { AlertComponent } from './components/alert/alert.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink, CommonModule, AlertComponent],
    templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
    shoppinglists$: Observable<ReadonlyArray<Shoppinglist>>;

    constructor(private store: Store<AppState>) {
        this.shoppinglists$ = this.store.select(selectShoppinglists)
    }

    ngOnInit(): void {
        this.store.dispatch(ShoppinglistActions.loadShoppinglists())
    }
}