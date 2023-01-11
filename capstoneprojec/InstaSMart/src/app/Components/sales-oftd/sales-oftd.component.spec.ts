import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOFTDComponent } from './sales-oftd.component';

describe('SalesOFTDComponent', () => {
  let component: SalesOFTDComponent;
  let fixture: ComponentFixture<SalesOFTDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesOFTDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesOFTDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
