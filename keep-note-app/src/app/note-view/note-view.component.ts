import { Component, Input, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Note } from '../models/note';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {

  @Input() notes: Array<Note>;
  constructor(private noteService: NotesService) {
  }
  ngOnInit(): void {
    this.noteService.getNotes().subscribe(p => this.notes = p);
  }
}
