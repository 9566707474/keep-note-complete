import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { NoteUser } from '../models/note-user';
import { Note } from '../models/note';


@Injectable()
export class NotesService {
  noteUser: NoteUser;
  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  apiUrl: string;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.notes = [];
    this.noteUser = new NoteUser();
    this.notesSubject = <BehaviorSubject<Array<Note>>>new BehaviorSubject([]);
    this.apiUrl = 'http://localhost:8082/api/Notes';
  }

  fetchNotesFromServer(): Observable<Array<Note>> {
    return this.httpClient.get<Array<Note>>(this.apiUrl + '/' + this.authService.getUserId(), {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    this.fetchNotesFromServer().subscribe(
      data => {
        this.notes = data;
        this.notesSubject.next(this.notes);
      },
      err => { console.log(err); }
    );

    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    note.createdBy = this.authService.getUserId();
    return this.httpClient.post<Note>(this.apiUrl + '/' + this.authService.getUserId(), note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  editNote(note: Note): Observable<Note> {
    return this.httpClient.put<Note>(this.apiUrl + '/' + note.createdBy + '/' + note.id, note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  getNoteByIdFromServer(id: any) {
    return this.httpClient.get<Note>(this.apiUrl + '/' + this.authService.getUserId() + '/' + id, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  getNoteById(noteId: any): Note {
    return this.notes.find(p => p.id == noteId);
  }

  removeNote(note: Note) {
    let notes: Note[] = this.notesSubject.getValue();
    var value = notes.filter(x => x.id != note.id);
    this.notesSubject.next(value);
  }

  addOrEditNoteSubject(note: Note) {
    let notes: Note[] = this.notesSubject.getValue();
    var value = notes.find(x => x.id == note.id && x.createdBy == note.createdBy);
    if (value) {
      value.title = note.title;
      value.content = note.content;
      value.reminders = note.reminders;
      value.category = note.category;
    } else {
      notes.push(note);
    }
    this.notesSubject.next(notes);
  }

  deleteNote(note: Note): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.apiUrl + '/' + note.createdBy + '/' + note.id, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }
}
