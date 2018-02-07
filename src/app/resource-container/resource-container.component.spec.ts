import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceContainerComponent } from './resource-container.component';

describe('ResourceContainerComponent', () => {
  let component: ResourceContainerComponent;
  let fixture: ComponentFixture<ResourceContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
