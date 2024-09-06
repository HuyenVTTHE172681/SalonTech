import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonDetailManageWorkerComponent } from './salon-detail-manage-worker.component';

describe('SalonDetailManageWorkerComponent', () => {
  let component: SalonDetailManageWorkerComponent;
  let fixture: ComponentFixture<SalonDetailManageWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonDetailManageWorkerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonDetailManageWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
