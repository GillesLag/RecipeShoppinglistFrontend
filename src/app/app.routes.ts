import { Routes } from '@angular/router';
import { shoppinglistDetailsComponent } from './components/shoppinglist-details/shoppinglist-details.component';
import { HomeComponent } from './home/home.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';

export const routes: Routes = [
    { path: 'shoppinglistDetail/:id', component: shoppinglistDetailsComponent },
    { path: 'recipeDetail/:id', component: RecipeDetailsComponent },
    { path: 'createRecipe', component: CreateRecipeComponent},
    { path: '', component: HomeComponent}
];
