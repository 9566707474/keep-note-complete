import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditNoteOpenerComponent } from '../edit-note-opener/edit-note-opener.component';
import { NotesService } from '../services/notes.service';
import { Note } from '../models/note';
import { CategoryService } from '../services/category.service';
import { Reminder } from '../models/reminder';
import { Category } from '../models/category';
import { ReminderService } from '../services/reminder.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent {
  note: Note;
  categories: Array<Category>;
  reminders: Array<Reminder>;
  toppings = new FormControl();
  errMessage: string;

  constructor(
    public dialogRef: MatDialogRef<EditNoteOpenerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private noteService: NotesService,
    private categoryService: CategoryService,
    private reminderService: ReminderService) {
    this.errMessage = '';
    this.note = data.note;
    this.getCategories();
    this.getReminders();
  }

  getCategories() {
    this.categoryService.categoriesSubject.subscribe(
      data => {
        this.categories = data;
      }, err => {
        console.log(err);
      });
  }

  compareFn(reminder1: any, reminder2: any) {
    return reminder1 && reminder2 ? reminder1.id === reminder2.id : reminder1 === reminder2;
  }

  getReminders() {
    this.reminderService.remindersSubject.subscribe(
      data => {
        this.reminders = data;
      }, err => { 
        console.log(err); });
  }

  onSave() {
    debugger;
    this.noteService.editNote(this.note).subscribe(
      data => {
        if(data){
          this.dialogRef.close(this.note);
        }else{
          this.errMessage = 'Not Updated';
        }
      }, err => {
        this.errMessage = 'Http failure response for http://localhost:8082/api/Notes 404 Not Found';
        console.log(err);
      });
  }
}
