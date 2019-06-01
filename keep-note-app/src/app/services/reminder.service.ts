import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Reminder } from '../models/reminder';

@Injectable()
export class ReminderService {

  apiUrl: string;
  reminders: Array<Reminder>;
  remindersSubject: BehaviorSubject<Array<Reminder>>;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.remindersSubject = <BehaviorSubject<Array<Reminder>>>new BehaviorSubject([]);
    this.apiUrl = 'http://localhost:8083/api/reminder';
  }

  fetchReminderFromServer(): Observable<Array<Reminder>> {
    return this.httpClient.get<Array<Reminder>>(this.apiUrl + '/' + this.authService.getUserId(), {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  getReminders() {
    this.fetchReminderFromServer().subscribe(
      data => {
        this.remindersSubject.next(data);
      },
      err => { console.log(err); }
    );
  }

  deleteReminder(id: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + '/' + id, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  saveReminder(reminder: Reminder): Observable<Reminder> {
    reminder.createdBy = this.authService.getUserId();
    return this.httpClient.post<Reminder>(this.apiUrl, reminder, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  editReminder(reminder: Reminder): Observable<Reminder> {
    return this.httpClient.put<Reminder>(this.apiUrl + '/' + reminder.id, reminder, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  getReminderById(id: number): Observable<Reminder> {
    return this.httpClient.get<Reminder>(this.apiUrl + '/' + id, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }

  removeReminderSubject(id: any) {
    let reminders: Reminder[] = this.remindersSubject.getValue();
    var value = reminders.filter(x => x.id != id);
    if (value) {
      this.remindersSubject.next(value);
    }
  }

  editReminderSubject(reminder: Reminder) {
    let reminders: Reminder[] = this.remindersSubject.getValue();
    var value = reminders.find(x => x.id == reminder.id);
    if (value) {
      value.description = reminder.description;
      value.name = reminder.name;
    } else {
      reminders.push(reminder);
    }
    this.remindersSubject.next(reminders);
  }
}
