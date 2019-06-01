import { Component, OnInit } from '@angular/core';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';
import { Note } from '../models/note';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit {

  note: Note;
  id: Number;

  constructor(public dialog: MatDialog, private route: ActivatedRoute,
    private noteService: NotesService,
    private routerService: RouterService) {

  }


  ngOnInit(): void {
    this.route.params.subscribe(params => console.log(params['noteId']));
    // this.id = this.route.outlet['noteId'];
    // this.note = this.noteService.getNoteById(this.id);
    // this.openDialog();

    this.route.params.subscribe(params => {
      this.id = params['noteId'];
      this.noteService.getNoteByIdFromServer(this.id).subscribe(result => {
        this.note = result;
        this.openDialog();
      }, err => { console.log(err); })
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditNoteViewComponent, {
      width: '250px',
      data: { note: this.note }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.id) {
        this.noteService.addOrEditNoteSubject(result);
      }
      this.routerService.routeBack();
    });
  }
}
