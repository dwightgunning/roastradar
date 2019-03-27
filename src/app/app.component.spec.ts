import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/screens/home/home.component';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { AboutComponent } from './components/screens/about/about.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        AgmCoreModule.forRoot({
          apiKey: environment.GOOGLE_MAPS_API_KEY
        }),
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        HomeComponent,
        TopNavBarComponent,
        FooterBarComponent,
        AboutComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Roast Radar'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Roast Radar');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Roast Radar');
  });
});
