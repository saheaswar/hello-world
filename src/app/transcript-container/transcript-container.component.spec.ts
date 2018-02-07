import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptContainerComponent } from './transcript-container.component';

describe('TranscriptContainerComponent', () => {
  let component: TranscriptContainerComponent;
  let fixture: ComponentFixture<TranscriptContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscriptContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscriptContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
