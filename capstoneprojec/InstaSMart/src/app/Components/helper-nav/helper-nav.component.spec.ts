import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelperNavComponent } from './helper-nav.component';

describe('HelperNavComponent', () => {
  let component: HelperNavComponent;
  let fixture: ComponentFixture<HelperNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelperNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelperNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
