import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonContentComponent } from './salon-content.component';

describe('SalonContentComponent', () => {
  let component: SalonContentComponent;
  let fixture: ComponentFixture<SalonContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
