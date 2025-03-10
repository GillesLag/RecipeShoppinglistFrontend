import { Component, inject, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { Recipe } from '../../models/Recipe';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Measurement } from '../../Enums/Measurement';

@Component({
    selector: 'app-recipe-details',
    imports: [CommonModule],
    templateUrl: './recipe-details.component.html',
})
export class RecipeDetailsComponent implements OnInit {
    recipeService = inject(RecipesService)

    id: string | null = null
    recipe!: Recipe;
    measurementList: string[] = Object.keys(Measurement).filter(key => isNaN(Number(key)));

    constructor(private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.id = params.get('id');
            this.recipeService.getById(parseInt(this.id!)).subscribe(recipe => {
                this.recipe = recipe;
                console.log(recipe);
            })
        });
    }


}
