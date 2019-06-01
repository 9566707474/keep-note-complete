export class Category {
    id: number;
    name: string;
    description: string;
    createdBy: string;
    creationDate:Date;
  
    constructor() {
      this.name = '';
      this.description = '';
      this.createdBy = '';
      this.creationDate = new Date();
    }
  }