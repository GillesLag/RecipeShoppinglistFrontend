import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Shoppinglist } from '../../models/Shoppinglist';
import { ShoppinglistService } from '../../services/shoppinglist.service';

@Component({
  selector: 'app-recipe-details',
  imports: [CommonModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {
  shoppinglistService = inject(ShoppinglistService)

  id: string | null = null;
  shoppinglist: Shoppinglist | undefined;

  constructor(private route: ActivatedRoute){
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.shoppinglistService.getShoppinglistById(parseInt(this.id)).subscribe(x => {
      this.shoppinglist = x;
    })
  }
}
