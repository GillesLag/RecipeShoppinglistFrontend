import { Component } from '@angular/core';
import { RecipeTableComponent } from '../components/recipe-table/recipe-table.component';

@Component({
  selector: 'home',
  imports: [RecipeTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
