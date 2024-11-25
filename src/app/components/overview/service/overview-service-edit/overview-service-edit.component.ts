import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectorService } from '../../../../services/sector.service';
import { Sector } from '../../../../model/sector';

@Component({
  selector: 'app-overview-service-edit',
  templateUrl: './overview-service-edit.component.html',
  styleUrls: ['./overview-service-edit.component.scss'],
})
export class OverviewServiceEditComponent implements OnInit {
  sectorForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sectorSrv: SectorService
  ) {
    this.sectorForm = this.formBuilder.group({
      _id: [''],
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      description: [''],
      status: [null, Validators.required],
      modified_by: [''],
      modified_date: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id) {
        this.getSectorById(id);
      }
    });
  }

  getSectorById(id: string): void {
    this.sectorSrv.getSectorById(id).subscribe((data) => {
      this.sectorForm.patchValue(data);
    });
  }

  onSubmitFormEditSector(): void {
    if (this.sectorForm.valid) {
      const updatedSector: Sector = this.sectorForm.value;

      // Convert status from string to number
      updatedSector.status = Number(updatedSector.status);

      console.log('Update Sector data: ', updatedSector);

      this.sectorSrv.updateSector(updatedSector._id, updatedSector).subscribe(
        (res) => {
          this.router.navigate(['/home/overview-service']);
        },
        (err) => {
          console.error('Error updating sector:', err);
          alert(
            `Something went wrong; please try again later. Details: ${err.message}`
          );
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/home/overview-service']);
  }
}
