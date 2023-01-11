import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewProdComponent } from './review-prod.component';

describe('ReviewProdComponent', () => {
  let component: ReviewProdComponent;
  let fixture: ComponentFixture<ReviewProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewProdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
