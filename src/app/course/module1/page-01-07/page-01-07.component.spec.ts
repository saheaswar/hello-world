import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Page0107Component } from './page-01-07.component';

describe('Page0107Component', () => {
  let component: Page0107Component;
  let fixture: ComponentFixture<Page0107Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page0107Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page0107Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
