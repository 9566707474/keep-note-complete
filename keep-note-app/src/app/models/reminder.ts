export class Reminder {
    id: number;
    name: string;
    description: string;
    createdBy: string;
    creationDate: Date;
    type: string;

    constructor() {
        this.name = '';
        this.description = '';
        this.createdBy = '';
        this.creationDate = new Date();
        this.type = '';
    }
}