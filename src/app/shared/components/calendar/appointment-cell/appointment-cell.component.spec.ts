import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCellComponent } from './appointment-cell.component';

describe('AppointmentCellComponent', () => {
  let component: AppointmentCellComponent;
  let fixture: ComponentFixture<AppointmentCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
