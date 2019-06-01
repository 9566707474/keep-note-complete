import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeavesViewComponent } from './add-leaves-view.component';

describe('AddLeavesViewComponent', () => {
  let component: AddLeavesViewComponent;
  let fixture: ComponentFixture<AddLeavesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLeavesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLeavesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
