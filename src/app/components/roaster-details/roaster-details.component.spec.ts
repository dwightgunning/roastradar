import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoasterDetailsComponent } from './roaster-details.component';
import { EncodeURIComponentPipe } from '../../pipes/encode-uricomponent.pipe';

describe('RoasterDetailsComponent', () => {
  let component: RoasterDetailsComponent;
  let fixture: ComponentFixture<RoasterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RoasterDetailsComponent,
        EncodeURIComponentPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
