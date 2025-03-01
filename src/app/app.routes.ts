import { Routes } from '@angular/router';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: 'detail/:id', component: RecipeDetailsComponent},
    {path: '', component: HomeComponent}
];
