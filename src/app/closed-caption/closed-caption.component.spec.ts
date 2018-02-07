import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedCaptionComponent } from './closed-caption.component';

describe('ClosedCaptionComponent', () => {
  let component: ClosedCaptionComponent;
  let fixture: ComponentFixture<ClosedCaptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedCaptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedCaptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
