import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0103Component } from './page-01-03.component';

describe('Page0103Component', () => {
  let component: Page0103Component;
  let fixture: ComponentFixture<Page0103Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page0103Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0103Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
