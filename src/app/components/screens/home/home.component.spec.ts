import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../../environments/environment';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        AgmCoreModule.forRoot({
          apiKey: environment.GOOGLE_MAPS_API_KEY
        }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
