import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuableformsComponent } from './reuableforms.component';

describe('ReuableformsComponent', () => {
  let component: ReuableformsComponent;
  let fixture: ComponentFixture<ReuableformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReuableformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReuableformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
