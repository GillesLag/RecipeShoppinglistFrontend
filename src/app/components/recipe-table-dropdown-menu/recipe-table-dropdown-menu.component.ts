import { Component, input, output } from '@angular/core';
import { Shoppinglist } from '../../models/Shoppinglist';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-table-dropdown-menu',
  imports: [CommonModule],
  templateUrl: './recipe-table-dropdown-menu.component.html',
})
export class RecipeTableDropdownMenuComponent {
    onUpdateShoppinglist = output<Shoppinglist>()
    shoppinglists = input.required<Observable<ReadonlyArray<Shoppinglist>>>()
    text = input.required<string>();

    updateShoppinglist(shoppinglist: Shoppinglist): void {
        this.onUpdateShoppinglist.emit(shoppinglist)
    }
}
