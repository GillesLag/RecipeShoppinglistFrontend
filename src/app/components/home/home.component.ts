import { Component } from '@angular/core';
import { RecipeTableComponent } from '../recipe-table/recipe-table.component';

@Component({
    selector: 'home',
    imports: [RecipeTableComponent],
    templateUrl: './home.component.html',
})
export class HomeComponent {

}
