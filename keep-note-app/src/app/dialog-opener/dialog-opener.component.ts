import { Component, OnInit } from '@angular/core';
import { AddLeavesViewComponent } from '../add-leaves-view/add-leaves-view.component';
import { Note } from '../note';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { TreeService } from '../services/tree.service';
import { Reminder } from '../models/reminder';
import { ReminderService } from '../services/reminder.service';

@Component({
  selector: 'app-dialog-opener',
  templateUrl: './dialog-opener.component.html',
  styleUrls: ['./dialog-opener.component.css']
})
export class DialogOpenerComponent implements OnInit {

  note: Note;
  id: number;
  IsCategory: boolean;
  category: Category;
  reminder:Reminder;


  constructor(public dialog: MatDialog, private route: ActivatedRoute,
    private categoryService: CategoryService,
    private treeService: TreeService,
    private reminderService: ReminderService,
    private routerService: RouterService) {
    this.IsCategory = false;

  }

  ngOnInit(): void {

    if (this.route.outlet.localeCompare("categoryAddOutlet") == 0) {
      this.IsCategory = true;
      this.category = new Category();
      this.openDialog();
    }

    if (this.route.outlet.localeCompare("categoryEditOutlet") == 0) {
      this.IsCategory = true;
      this.route.params.subscribe(params => {
        this.id = params['categoryId'];
        this.categoryService.getCategoryById(this.id).subscribe(
          result => {
            this.category = result;
            this.openDialog();
          });

      });
    }

    if (this.route.outlet.localeCompare("reminderAddOutlet") == 0) {
      this.IsCategory = false;
      this.reminder = new Reminder();
      this.openDialog();
    }

    if (this.route.outlet.localeCompare("reminderEditOutlet") == 0) {
      this.IsCategory = false;
      this.route.params.subscribe(params => {
        this.id = params['reminderId'];
        this.reminderService.getReminderById(this.id).subscribe(
          result => {
            this.reminder = result;
            this.openDialog();
          });

      });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddLeavesViewComponent, {
      width: '250px',
      data: { category: this.category ,
         reminder: this.reminder,
        isCategory:  this.IsCategory}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result && result.id) {
        if(this.IsCategory){
          this.treeService.updateLeafNode(result,0);
          this.categoryService.editCategorySubject(result);
        }else{
          this.treeService.updateLeafNode(result,1);
          this.reminderService.editReminderSubject(result);
        }
      }
      this.routerService.routeBack();
    });
  }

  getCategoryById(id: any): Category {
    debugger;
    let value = new Category();
    this.categoryService.getCategoryById(id).subscribe(
      result => {
        return result;
      });
    return value;
  }
}
