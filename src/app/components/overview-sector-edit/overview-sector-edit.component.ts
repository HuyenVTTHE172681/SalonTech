import { Component, OnInit } from '@angular/core';
import { SectorService } from '../../services/sector.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from '../../model/service';
import { Sector } from '../../model/sector';

@Component({
  selector: 'app-overview-sector-edit',
  templateUrl: './overview-sector-edit.component.html',
  styleUrl: './overview-sector-edit.component.scss',
})
export class OverviewSectorEditComponent implements OnInit {
  page: number = 1;
  size: number = 5; // display 10 item per page
  status: number = 1;
  serviceForm: any;
  sectors: Sector[] = [];

  constructor(
    private sectorSrv: SectorService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.serviceForm = this.fb.group({
      _id: [''],
      name: ['', [Validators.required]],
      status: [null, Validators.required],
      sector_id: ['', Validators.required],
      modified_by: [''],
      modified_date: [''],
      sector: [''],
    });
  }

  ngOnInit(): void {}

  getServiceById(id: string): void {
    this.sectorSrv.getSectorById(id).subscribe((data) => {
      this.serviceForm.patchValue(data);
    });
  }

  onSubmitFormEditService(): void {
    if (this.serviceForm.valid) {
      const updateService: Service = this.serviceForm.value;
    }
  }

  onCancel(): void {
    this.router.navigate(['/home/overview-sector']);
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
}
