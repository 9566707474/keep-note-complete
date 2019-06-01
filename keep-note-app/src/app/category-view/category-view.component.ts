import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {
  
  @Input() categories:Array<Category>;  
  @Input() selectedItem:Category;

  @Output() selected = new EventEmitter<string>();

  constructor(private categoryService:CategoryService) { 
  }

  ngOnInit() {
   
  }

  doSomething(data:any){
    this.selected.emit(data.value);
  }

}
