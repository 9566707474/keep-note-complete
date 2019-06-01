import { Component, OnInit, Input } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Note } from '../models/note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input() note: Note;

  constructor(private routerService: RouterService,
    private noteService:NotesService) {

  }

  edit(id: any) {
    console.log(id);
    this.routerService.routeToEditNoteView(id);
  }

  deleteNote(note:any){
    this.noteService.deleteNote(note).subscribe(
      data => {
       if(data){
         this.noteService.removeNote(note);
       }
      },
      err => { console.log(err); }
    );
  }
}
