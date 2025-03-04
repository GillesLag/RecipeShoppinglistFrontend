import { Routes } from '@angular/router';
import { shoppinglistDetailsComponent } from './components/shoppinglist-details/shoppinglist-details.component';
import { HomeComponent } from './home/home.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';

export const routes: Routes = [
    { path: 'shoppinglistDetail/:id', component: shoppinglistDetailsComponent },
    { path: 'recipeDetail/:id', component: RecipeDetailsComponent },
    { path: '', component: HomeComponent}
];
