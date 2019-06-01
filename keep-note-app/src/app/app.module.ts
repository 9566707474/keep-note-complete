import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatMenuModule, MatListModule, MatIconModule, MatDialog, MatButtonModule, MatCardModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule, MatTreeModule, MatCheckboxModule } from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { AuthenticationService } from './services/authentication.service';
import { NotesService } from './services/notes.service';
import { RouterService } from './services/router.service';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteComponent } from './note/note.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownActionComponent } from './dropdown-action/dropdown-action.component';
import { ReminderComponentComponent } from './reminder-component/reminder-component.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { ReminderViewComponent } from './reminder-view/reminder-view.component';
import { TreeCheckListComponentComponent } from './tree-check-list-component/tree-check-list-component.component';
import { CategoryService } from './services/category.service';
import { DialogOpenerComponent } from './dialog-opener/dialog-opener.component';
import { AddLeavesViewComponent } from './add-leaves-view/add-leaves-view.component';
import { TreeService } from './services/tree.service';
import { ReminderService } from './services/reminder.service';
import { RegisterComponent } from './register/register.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { HomeComponent } from './home/home.component';
import { UserService } from './services/user.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './services/alert.service';

const appRoutes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [CanActivateRouteGuard]
  },
  {
    path: '', component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard/view/noteview',
    pathMatch: 'full'
  }
];

const childRoot: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent, children: [
          {
            path: 'view/noteview',
            component: NoteViewComponent
          },
          { path: 'category', component: DialogOpenerComponent, outlet: 'categoryAddOutlet' },
          { path: 'category/:categoryId/edit', component: DialogOpenerComponent, outlet: 'categoryEditOutlet' },
          { path: 'reminder', component: DialogOpenerComponent, outlet: 'reminderAddOutlet' },
          { path: 'reminder/:reminderId/edit', component: DialogOpenerComponent, outlet: 'reminderEditOutlet' },
          { path: 'note/:noteId/edit', component: EditNoteOpenerComponent, outlet: 'noteEditOutlet' },
          {
            path: '',
            redirectTo: '/dashboard/view/noteview',
            pathMatch: 'full'
          }
        ]
      }
    ], canActivate: [CanActivateRouteGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    LoginComponent,
    DashboardComponent,
    NoteComponent,
    NoteViewComponent,
    ListViewComponent,
    NoteTakerComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent,
    DropdownActionComponent,
    ReminderComponentComponent,
    CategoryViewComponent,
    ReminderViewComponent,
    TreeCheckListComponentComponent,
    DialogOpenerComponent,
    AddLeavesViewComponent,
    RegisterComponent,
    LoginLayoutComponent,
    HomeComponent,
    PageNotFoundComponent,
    AlertComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes,
      { enableTracing: false }
    ),
    RouterModule.forChild(childRoot),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgbModule,
    MatMenuModule,
    MatTreeModule,
    MatCheckboxModule
  ],
  providers: [RouterService,
    NotesService,
    AuthenticationService,
    AlertService,
    CanActivateRouteGuard,
    MatDialog,
    TreeService,
    CategoryService,
    ReminderService,
    UserService],
  exports: [DropdownActionComponent],
  bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent, AddLeavesViewComponent]
})
export class AppModule { }
