import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastViewerComponent } from './forecast-viewer.component';

describe('ForecastViewerComponent', () => {
  let component: ForecastViewerComponent;
  let fixture: ComponentFixture<ForecastViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
