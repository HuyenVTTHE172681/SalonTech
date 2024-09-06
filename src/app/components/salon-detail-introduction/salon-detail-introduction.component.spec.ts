import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonDetailIntroductionComponent } from './salon-detail-introduction.component';

describe('SalonDetailIntroductionComponent', () => {
  let component: SalonDetailIntroductionComponent;
  let fixture: ComponentFixture<SalonDetailIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonDetailIntroductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonDetailIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
