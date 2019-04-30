import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterBarComponent } from './footer-bar.component';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  template: ''
})
class StubComponent { }


describe('FooterBarComponent', () => {
  let component: FooterBarComponent;
  let fixture: ComponentFixture<FooterBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FooterBarComponent,
        StubComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: StubComponent }
        ])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
