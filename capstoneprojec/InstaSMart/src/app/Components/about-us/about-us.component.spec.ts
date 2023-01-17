import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUSComponent } from './about-us.component';

describe('AboutUSComponent', () => {
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

  it('should create', () => {// Checking If The Component is Created Or not
    expect(component).toBeTruthy();
  });

  it("Should Be The Name About Us",()=>{ //Checking If it's Rendering with appropiate title or not
    fixture = TestBed.createComponent(AboutUSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector("#title").textContent).toContain("Know More About Us"); //Checking the title format
  })
});
