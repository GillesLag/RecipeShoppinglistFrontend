import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ShoppinglistService } from './services/shoppinglist.service';
import { Shoppinglist } from './models/Shoppinglist';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ShoppinglistActions } from './state/shoppinglist.actions';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
    shoppinglistService = inject(ShoppinglistService)

    shoppinglists!: Observable<Shoppinglist[]>;

    constructor(private store: Store<{ shoppinglists: Shoppinglist[] }>) {

    }

    ngOnInit(): void {
        this.shoppinglistService.getAllShoppinglists().subscribe(shoppinglists => {
            this.store.dispatch(ShoppinglistActions.setShoppinglists({ shoppinglists: shoppinglists }))
            this.shoppinglists = this.store.select(state => state.shoppinglists)
        })

    }
}