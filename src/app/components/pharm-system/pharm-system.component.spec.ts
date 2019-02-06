import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmSystemComponent } from './pharm-system.component';

describe('PharmSystemComponent', () => {
  let component: PharmSystemComponent;
  let fixture: ComponentFixture<PharmSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
