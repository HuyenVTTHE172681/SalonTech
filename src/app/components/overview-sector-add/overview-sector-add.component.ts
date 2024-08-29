import { Component, OnInit } from '@angular/core';
import { SectorService } from '../../services/sector.service';
import { ServiceService } from '../../services/service.service';
import { Sector } from '../../model/sector';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview-sector-add',
  templateUrl: './overview-sector-add.component.html',
  styleUrl: './overview-sector-add.component.scss',
})
export class OverviewSectorAddComponent implements OnInit {
  page: number = 1;
  size: number = 5; // display 10 item per page
  status: number = 1;
  sectors: Sector[] = [];

  serviceForm: any;

  constructor(
    private sectorSrv: SectorService,
    private serviceSrv: ServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      selectedSector: [null, Validators.required],
      code: [null, Validators.required],
      name: ['', Validators.required],
      status: [null, Validators.required],
    });

    this.getAllSector();
  }

  onSubmitFormAddService(form: NgForm) {
    if (this.serviceForm.valid) {
      // Chuyển đổi status thành số trước khi gọi service
      const formValue = {
        ...this.serviceForm.value,
        status: Number(this.serviceForm.value.status),
        sector_id: this.serviceForm.value.selectedSector._id,
      };
      console.log('Form Value:', formValue);

      this.serviceSrv.addService(formValue).subscribe(
        (res) => {
          alert('Them thanh cong');
          this.router.navigate(['/home/overview-sector']);
        },
        (err) => {
          console.log(err);
          console.log('Auhuhuhu');
        }
      );
    }
  }

  getAllSector() {
    this.sectorSrv.getAllSector(this.page, this.size, this.status).subscribe({
      next: (data) => {
        this.sectors = data.items;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
        console.log('Ahuhu');
      },
    });
  }

  onCancel() {
    this.serviceForm.reset();
  }
}
