import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent, IAppointment } from './home.component';
import { HomeModule } from './home.module';
import { NgxsModule } from '@ngxs/store';
import { HomesState } from './store/calendar/home.state';
import { ForecastState } from './store/forecast/forecast.state';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import * as moment from 'moment';
import { Store } from '@ngxs/store';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HomeModule,
        NoopAnimationsModule,
        NgxsModule.forRoot([HomesState, ForecastState]),
        HttpClientModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call add if new', () => {
    const updateString = 'get dog back';
    let testValues: IAppointment = {
      reminder: 'walk dog',
      date: moment(),
      color: '#f5f5f5',
      cityId: 3433955,
      id: 0
    };
    component.appointmentCreated(testValues);

    const position = moment().format('YYYY-MM-DD').split('-');

    let appointments = store.selectSnapshot((state) => state.home.years);
    let dayappointments = appointments[position[0]][position[1]][position[2]];
    expect(dayappointments.length).toBe(1);
    
    appointments = store.selectSnapshot((state) => state.home.years);
    dayappointments = appointments[position[0]][position[1]][position[2]];
    component.appointmentCreated(testValues);
    expect(dayappointments.length).toBe(2);

  });
});
