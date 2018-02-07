import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0104Component } from './page-01-04.component';

describe('Page0104Component', () => {
  let component: Page0104Component;
  let fixture: ComponentFixture<Page0104Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page0104Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0104Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
