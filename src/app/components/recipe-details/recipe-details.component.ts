import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Shoppinglist } from '../../models/Shoppinglist';
import { ShoppinglistService } from '../../services/shoppinglist.service';
import { Measurement } from '../../Enums/Measurement';

@Component({
    selector: 'app-recipe-details',
    imports: [CommonModule],
    templateUrl: './recipe-details.component.html',
    styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit {
    shoppinglistService = inject(ShoppinglistService)

    id: string | null = null;
    shoppinglist: Shoppinglist | undefined;

    constructor(private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.id = params.get('id');
            this.shoppinglistService.getShoppinglistById(parseInt(this.id!)).subscribe(shoppinglist => {
                this.shoppinglist = shoppinglist;
            })
        });
    }
}
