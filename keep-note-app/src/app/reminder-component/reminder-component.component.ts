import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Reminder } from '../models/reminder';

@Component({
  selector: 'app-reminder-component',
  templateUrl: './reminder-component.component.html',
  styleUrls: ['./reminder-component.component.css']
})
export class ReminderComponentComponent implements OnInit {

  toppings = new FormControl();
  @Input() reminders:Array<Reminder>;
  @Input() selectedReminderItems:Array<Reminder>=[];
  @Output() selectedReminders = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    if(this.selectedReminderItems){
    this.toppings.setValue(this.selectedReminderItems);
    }
  }


  doSomething(data:any){
    if(this.toppings.value){
      this.selectedReminders.emit(this.toppings.value);
    }
  }
}
