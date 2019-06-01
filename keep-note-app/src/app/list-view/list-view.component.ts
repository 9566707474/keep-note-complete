import { Component, OnInit, Input } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';
import { Note } from '../models/note';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  @Input() notStartedNotes: Array<Note>;
  @Input() startedNotes: Array<Note>;
  @Input() completedNotes: Array<Note>;

  constructor(private noteService: NotesService) {
  }

  ngOnInit(): void {
    this.noteService.getNotes().subscribe(
      data => {
      
      }
    );
  }
}
