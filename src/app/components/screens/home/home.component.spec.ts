import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../../environments/environment';

import { HomeComponent } from './home.component';
import { RoasterDetailsComponent } from '../../roaster-details/roaster-details.component';
import { EncodeURIComponentPipe } from '../../../pipes/encode-uricomponent.pipe';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        RoasterDetailsComponent,
        EncodeURIComponentPipe
      ],
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
