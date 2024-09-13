import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherContentComponent } from './voucher-content.component';

describe('VoucherContentComponent', () => {
  let component: VoucherContentComponent;
  let fixture: ComponentFixture<VoucherContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoucherContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoucherContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
