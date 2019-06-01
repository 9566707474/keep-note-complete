import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogOpenerComponent } from '../dialog-opener/dialog-opener.component';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { Reminder } from '../models/reminder';
import { ReminderService } from '../services/reminder.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-add-leaves-view',
  templateUrl: './add-leaves-view.component.html',
  styleUrls: ['./add-leaves-view.component.css']
})
export class AddLeavesViewComponent {

  form;
  title: string;
  category: Category;
  reminder: Reminder;
  errMessage: string;
  isCategory: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogOpenerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private reminderService: ReminderService,
    private authService:AuthenticationService) {
    this.errMessage = '';
    this.category = data.category;
    this.reminder = data.reminder;
    this.isCategory = data.isCategory;
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['']
    });
    this.loadData();
  }

  submit() {
    if (this.form.valid) {
      if (this.isCategory) {
        if (!this.category.id) {
          this.category = new Category();
          this.saveCategoryData();
        } else {
          this.editCategoryData();
        }
      } else {
        if (!this.reminder.id) {
          this.reminder = new Reminder();
          this.saveReminderData();
        } else {
          this.editReminderData();
        }
      }

    }
  }

  close() {
    this.dialogRef.close(this.data);
  }

  loadData() {
    if (this.isCategory) {
      this.title = "Add Category";
      this.loadCategoryData();
    } else {
      this.title = "Add Reminder";
      this.loadReminderData();
    }
  }

  loadCategoryData() {
    if (this.category.id) {
      this.title = "Edit Category";
      this.form.patchValue({
        name: this.category.name,
        description: this.category.description
      });
    }
  }

  loadReminderData() {
    if (this.reminder.id) {
      this.title = "Edit Reminder";
      this.form.patchValue({
        name: this.reminder.name,
        description: this.reminder.description
      });
    }
  }

  setCategoryData() {
    this.category.name = this.form.value.name;
    this.category.description = this.form.value.description;
    this.category.createdBy = this.authService.getUserId();
  }

  setReminderData() {
    this.reminder.name = this.form.value.name;
    this.reminder.description = this.form.value.description;
    this.reminder.createdBy = this.authService.getUserId();
  }

  editCategoryData() {
    this.setCategoryData();
    this.categoryService.editCategory(this.category).subscribe(
      result => {
        if (result) {
          this.dialogRef.close(this.category);
        }
      }, err => { this.errMessage = 'Http failure response for http://localhost:3000/api/v1/notes: 404 Not Found'; });
  }

  saveCategoryData() {
    this.setCategoryData();
    this.categoryService.saveCategory(this.category).subscribe(
      result => {
        this.dialogRef.close(result);
      }, err => { this.errMessage = 'Http failure response for http://localhost:3000/api/v1/notes: 404 Not Found'; });
  }

  editReminderData() {
    this.setReminderData();
    this.reminderService.editReminder(this.reminder).subscribe(
      result => {
        if (result) {
          this.dialogRef.close(this.reminder);
        }
      }, err => { this.errMessage = 'Http failure response for http://localhost:3000/api/v1/notes: 404 Not Found'; });
  }

  saveReminderData() {
    this.setReminderData();
    this.reminderService.saveReminder(this.reminder).subscribe(
      result => {
        this.dialogRef.close(result);
      }, err => { this.errMessage = 'Http failure response for http://localhost:3000/api/v1/notes: 404 Not Found'; });
  }

}
