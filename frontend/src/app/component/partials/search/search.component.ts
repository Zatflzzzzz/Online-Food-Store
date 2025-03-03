import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm = '';
  @Input() searchContext: string = "search_food";

  constructor(activatedRoute:ActivatedRoute,private router:Router){
    activatedRoute.params.subscribe(params => {
      if(params.searchTerm) this.searchTerm = params.searchTerm
    })
  }

  search(searchTerm:string):void{ 
    if(searchTerm.length)
      this.router.navigateByUrl(`/${this.searchContext}/` + searchTerm)
  }   
}
