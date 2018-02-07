import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0108Component } from './page-01-08.component';

describe('Page0108Component', () => {
  let component: Page0108Component;
  let fixture: ComponentFixture<Page0108Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page0108Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0108Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
