import { Category } from '../models/category';
import { Reminder } from '../models/reminder';

export class Note {
    id: number;
    title: string;
    content: string;
    category: Category;
    reminders: Array<Reminder>;
    createdBy: string;
    creationDate: Date;

    constructor() {
        this.title = '';
        this.content = '';
        this.createdBy = '';
        this.creationDate = new Date();
    }
}