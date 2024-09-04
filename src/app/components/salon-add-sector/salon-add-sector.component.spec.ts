import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonAddSectorComponent } from './salon-add-sector.component';

describe('SalonAddSectorComponent', () => {
  let component: SalonAddSectorComponent;
  let fixture: ComponentFixture<SalonAddSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonAddSectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonAddSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
