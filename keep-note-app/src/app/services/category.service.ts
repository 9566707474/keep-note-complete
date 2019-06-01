import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Category } from '../models/category';

@Injectable()
export class CategoryService {

  apiUrl: string;
  categories: Array<Category>;
  categoriesSubject: BehaviorSubject<Array<Category>>;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.categoriesSubject = <BehaviorSubject<Array<Category>>>new BehaviorSubject([]);
    this.apiUrl = 'http://localhost:8081/api/category';
  }

  fetchCategoryFromServer(): Observable<Array<Category>> {
    return this.httpClient.get<Array<Category>>(this.apiUrl + '/' + this.authService.getUserId(), {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  getCategories() {
    this.fetchCategoryFromServer().subscribe(
      data => {
        this.categoriesSubject.next(data);
      },
      err => { console.log(err); }
    );
  }

  deleteCategory(id: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + '/' + id, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  saveCategory(category: Category): Observable<Category> {
    category.createdBy = this.authService.getUserId();
    return this.httpClient.post<Category>(this.apiUrl, category, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  editCategory(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.apiUrl + '/' + category.id, category, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  getCategoryById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(this.apiUrl + '/' + id, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  removeCategorySubject(id: any) {
    let categories: Category[] = this.categoriesSubject.getValue();
    var value = categories.filter(x => x.id != id);
    if (value) {
      this.categoriesSubject.next(value);
    }
  }

  editCategorySubject(category: Category) {
    let categories: Category[] = this.categoriesSubject.getValue();
    var value = categories.find(x => x.id == category.id);
    if (value) {
      value.description = category.description;
      value.name = category.name;
    } else {
      categories.push(category);
    }
    this.categoriesSubject.next(categories);
  }

}
