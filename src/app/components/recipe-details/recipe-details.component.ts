import { Component, OnInit } from '@angular/core';
import { routes } from '../../app.routes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  imports: [],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit {
  id: string | null = null

  constructor(private route: ActivatedRoute){
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }

}
