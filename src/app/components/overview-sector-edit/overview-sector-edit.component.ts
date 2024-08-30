import { Component, OnInit } from '@angular/core';
import { SectorService } from '../../services/sector.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../model/service';
import { Sector } from '../../model/sector';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-overview-sector-edit',
  templateUrl: './overview-sector-edit.component.html',
  styleUrls: ['./overview-sector-edit.component.scss'],
})
export class OverviewSectorEditComponent implements OnInit {
  page: number = 1;
  size: number = 5; // Display items per page
  serviceForm: any;
  sectors: Sector[] = [];
  selectedSectorId: string | null = null;

  constructor(
    private sectorSrv: SectorService,
    private serviceSrv: ServiceService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.serviceForm = this.fb.group({
      _id: [''],
      name: ['', [Validators.required]],
      code: [''],
      description: [''],
      status: [null, Validators.required],
      price: [''],
      sector_id: ['', Validators.required],
      created_date: [''],
      created_by: [''],
      modified_by: [''],
      modified_date: [''],
      voucher_ids: [[]],
      sector: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id) {
        this.getServiceById(id);
        this.getAllSector(); // Fetch all sectors to populate the dropdown
      }
    });
  }

  getServiceById(id: string): void {
    this.serviceSrv.getServiceById(id).subscribe((data) => {
      this.serviceForm.patchValue(data);
      this.selectedSectorId = data.sector_id; // Set the selected sector ID
    });
  }

  getAllSector(): void {
    this.sectorSrv.getAllSectorNoStatus(this.page, this.size).subscribe({
      next: (data) => {
        this.sectors = data.items;
        // Optionally set the default selected value if needed
        if (this.selectedSectorId) {
          this.serviceForm.patchValue({ sector_id: this.selectedSectorId });
        }
      },
      error: (err) => {
        console.error('Error fetching sectors:', err);
      },
    });
  }

  onSubmitFormEditService(): void {
    if (this.serviceForm.valid) {
      const updateService: Service = this.serviceForm.value;

      // Convert status from string to number
      updateService.status = Number(updateService.status);

      // Debugging
      console.log('Update Service Data:', updateService);

      this.serviceSrv.updateService(updateService._id, updateService).subscribe(
        (res) => {
          this.router.navigate(['/home/overview-sector']);
        },
        (err) => {
          console.error('Error updating service:', err);
          // Print detailed error response
          console.error('Error Response:', err.error);
          alert(
            `Something went wrong; please try again later. Details: ${err.message}`
          );
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  onCancel(): void {
    this.router.navigate(['/home/overview-sector']);
  }
}
