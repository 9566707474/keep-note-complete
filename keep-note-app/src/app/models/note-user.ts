import { Note } from '../models/note';

export class NoteUser {
    userId: string;
    notes: Array<Note>;

    constructor() {
        this.userId = '';
        this.notes = new Array<Note>();
    }
}