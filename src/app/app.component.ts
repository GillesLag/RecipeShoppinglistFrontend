import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipesService } from './services/recipes.service';
import { Recipe } from './models/Recipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  recipeService = inject(RecipesService)
  recipes: Recipe[] = [];

  ngOnInit(): void {
    this.recipeService.GetAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }
  
  
}
