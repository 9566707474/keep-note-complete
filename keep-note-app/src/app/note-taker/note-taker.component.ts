import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Router } from '@angular/router';
import { Note } from '../models/note';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { Reminder } from '../models/reminder';
import { ReminderService } from '../services/reminder.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {
  errMessage: string;
  public note: Note;
  public notes: Note[];
  public selectedCategory: Category;
  public categories: Array<Category>;
  public reminders: Array<Reminder>;
  public selectedReminders: Array<Reminder>;
  public isDashboard: boolean;
  public title: string;

  constructor(private notesService: NotesService,
    private categoryService: CategoryService,
    private reminderService: ReminderService,
    private route: Router) {
    this.note = new Note();
    this.selectedCategory = new Category();
    this.selectedReminders = [];
    this.notes = [];
    this.categories = [];
    this.reminders = [];
    this.errMessage = '';
    this.isDashboard = false;
    this.title = 'Take a note';
  }

  ngOnInit() {
    this.errMessage = '';
    this.getCategories();
    this.getReminders();
    this.notesService.getNotes().subscribe(
      data => {
        this.notesService.notesSubject.subscribe(reault => this.notes = reault);
      },
      err => { this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found'; }
    );
  }

  getCategories() {
    this.categoryService.getCategories();
    this.categoryService.categoriesSubject.subscribe(
      data => {
        this.categories = data;
      }, err => { console.log(err); });
  }

  getReminders() {
    this.reminderService.getReminders();
    this.reminderService.remindersSubject.subscribe(
      data => {
        this.reminders = data;
      }, err => { console.log(err); });
  }

  addNote() {
    if (!!this.note.content && !!this.note.title) {
      this.notesService.addNote(this.note).subscribe(
        data => {
          this.notesService.addOrEditNoteSubject(data);
        }, err => { this.errMessage = 'Http failure response for http://localhost:3000/api/v1/notes: 404 Not Found'; });

      this.note = new Note();
      this.selectedCategory = new Category();
      this.selectedReminders = [];
    } else {
      this.errMessage = 'Title and Text both are required fields';
    }
  }

  getCategory(data: any) {
    if (data) {
      this.note.category = data;
      this.selectedCategory = data;
    }
  }

  addedReminders(data: any) {
    if (data) {
      this.note.reminders = data;
      this.selectedReminders = data;
    }
  }

}
