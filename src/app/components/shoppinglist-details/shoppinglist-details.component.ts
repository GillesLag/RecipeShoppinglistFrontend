import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Shoppinglist } from '../../models/Shoppinglist';
import { ShoppinglistService } from '../../services/shoppinglist.service';
import { Measurement } from '../../Enums/Measurement';
import { Recipe } from '../../models/Recipe';
import { ShoppinglistRecipe } from '../../models/ShoppinglistRecipe';

@Component({
    selector: 'app-recipe-details',
    imports: [CommonModule],
    templateUrl: './shoppinglist-details.component.html',
    styleUrl: './shoppinglist-details.component.css'
})
export class shoppinglistDetailsComponent implements OnInit {
    shoppinglistService = inject(ShoppinglistService)

    id: string | null = null;
    shoppinglist: Shoppinglist | undefined;
    recipes: ShoppinglistRecipe[] = []
    measurementList: string[] = Object.keys(Measurement).filter(key => isNaN(Number(key)))

    constructor(private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.id = params.get('id');
            this.shoppinglistService.getShoppinglistById(parseInt(this.id!)).subscribe(shoppinglist => {
                this.shoppinglist = shoppinglist;
                this.recipes = shoppinglist.shoppinglistRecipes
                console.log(shoppinglist)
            })
        });
    }
}
