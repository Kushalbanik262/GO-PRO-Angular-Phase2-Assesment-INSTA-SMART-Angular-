import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUSComponent } from './about-us.component';

xdescribe('AboutUSComponent', () => {
  let component: AboutUSComponent;
  let fixture: ComponentFixture<AboutUSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should Be The Name About Us",()=>{
    fixture = TestBed.createComponent(AboutUSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector("#title").textContent).toContain("Know More About Us");
  })
});
