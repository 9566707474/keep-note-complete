import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeCheckListComponentComponent } from './tree-check-list-component.component';

describe('TreeCheckListComponentComponent', () => {
  let component: TreeCheckListComponentComponent;
  let fixture: ComponentFixture<TreeCheckListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeCheckListComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeCheckListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
