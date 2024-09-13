import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonAddManageWorkerComponent } from './salon-add-manage-worker.component';

describe('SalonAddManageWorkerComponent', () => {
  let component: SalonAddManageWorkerComponent;
  let fixture: ComponentFixture<SalonAddManageWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonAddManageWorkerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonAddManageWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
