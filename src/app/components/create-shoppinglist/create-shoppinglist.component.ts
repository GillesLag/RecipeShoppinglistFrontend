import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/appState';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppinglistActions } from '../../state/actions/shoppinglist.actions';


@Component({
  selector: 'app-create-shoppinglist',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-shoppinglist.component.html',
  styleUrl: './create-shoppinglist.component.css'
})
export class CreateShoppinglistComponent {
    shoppinglistName: string = ''

    constructor(private store: Store<AppState>, ){}

    createShoppinglist(): void {
        if (!this.shoppinglistName) {
            return;
        }

        this.store.dispatch(ShoppinglistActions.createShoppinglist({newShoppinglist: {name: this.shoppinglistName}}))

        this.shoppinglistName = '';
    }
}
