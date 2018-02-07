import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0102Component } from './page-01-02.component';

describe('Page0102Component', () => {
  let component: Page0102Component;
  let fixture: ComponentFixture<Page0102Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page0102Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0102Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
