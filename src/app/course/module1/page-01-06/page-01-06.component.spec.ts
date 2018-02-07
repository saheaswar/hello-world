import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0106Component } from './page-01-06.component';

describe('Page0106Component', () => {
  let component: Page0106Component;
  let fixture: ComponentFixture<Page0106Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page0106Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0106Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
