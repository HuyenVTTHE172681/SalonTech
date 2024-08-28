import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SectorService } from '../../services/sector.service';

@Component({
  selector: 'app-overview-service-add',
  templateUrl: './overview-service-add.component.html',
  styleUrl: './overview-service-add.component.scss',
})
export class OverviewServiceAddComponent implements OnInit {
  ingredient!: string;
  sectorForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sectorSrv: SectorService
  ) {}

  ngOnInit(): void {
    this.sectorForm = this.formBuilder.group({
      name: [null, Validators.required],
      code: ['', Validators.required],
      status: [null, Validators.required],
    });
  }

  onSubmitFormAddSector(form: NgForm) {
    if (this.sectorForm.valid) {
      // Chuyển đổi status thành số trước khi gọi service
      const formValue = {
        ...this.sectorForm.value,
        status: Number(this.sectorForm.value.status),
      };

      this.sectorSrv.addSector(formValue).subscribe(
        (res) => {
          alert('Thêm thành công với trạng thái ' + formValue.status);
          console.log('Status:', formValue.status);
          console.log('Form Value:', formValue);
          this.router.navigate(['home/overview-service']);
        },
        (err) => {
          console.log('Error:', err);
        }
      );
    }
  }

  onCancel() {
    this.sectorForm.reset();
  }
}
