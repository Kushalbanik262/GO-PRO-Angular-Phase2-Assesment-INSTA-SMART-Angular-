import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecProdComponent } from './spec-prod.component';

describe('SpecProdComponent', () => {
  let component: SpecProdComponent;
  let fixture: ComponentFixture<SpecProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecProdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
