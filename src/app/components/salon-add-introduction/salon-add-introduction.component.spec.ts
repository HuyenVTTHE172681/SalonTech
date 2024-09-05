import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonAddIntroductionComponent } from './salon-add-introduction.component';

describe('SalonAddIntroductionComponent', () => {
  let component: SalonAddIntroductionComponent;
  let fixture: ComponentFixture<SalonAddIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonAddIntroductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonAddIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
