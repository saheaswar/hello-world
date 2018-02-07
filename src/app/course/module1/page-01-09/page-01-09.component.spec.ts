import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0109Component } from './page-01-09.component';

describe('Page0109Component', () => {
  let component: Page0109Component;
  let fixture: ComponentFixture<Page0109Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page0109Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0109Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
