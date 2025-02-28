import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ShoppinglistService } from './services/shoppinglist.service';
import { Shoppinglist } from './models/Shoppinglist';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  shoppinglistService = inject(ShoppinglistService)

  shoppinglists: Shoppinglist[] = [];

  ngOnInit(): void {
    this.shoppinglistService.GetAllShoppinglists().subscribe(shoppinglists => {
      this.shoppinglists = shoppinglists
    })
  }
}
