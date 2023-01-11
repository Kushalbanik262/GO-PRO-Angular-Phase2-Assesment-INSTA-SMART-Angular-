import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPRComponent } from './admin-pr.component';

describe('AdminPRComponent', () => {
  let component: AdminPRComponent;
  let fixture: ComponentFixture<AdminPRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
