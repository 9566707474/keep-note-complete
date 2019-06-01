export class User {
    userId: string;
    name: string;
    contact: string;
    addedDate: Date;
    
    constructor() {
        this.userId='';
        this.name = '';
        this.contact = '';
        this.addedDate = new Date();
    }
}