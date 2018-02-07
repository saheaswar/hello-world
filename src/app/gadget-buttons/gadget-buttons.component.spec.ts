import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GadgetButtonsComponent } from './gadget-buttons.component';

describe('GadgetButtonsComponent', () => {
  let component: GadgetButtonsComponent;
  let fixture: ComponentFixture<GadgetButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GadgetButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GadgetButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
