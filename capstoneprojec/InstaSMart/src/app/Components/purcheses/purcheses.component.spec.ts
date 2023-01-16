import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchesesComponent } from './purcheses.component';

xdescribe('PurchesesComponent', () => {
  let component: PurchesesComponent;
  let fixture: ComponentFixture<PurchesesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchesesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
