import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Salon } from '../../model/salon';
import { SectorService } from '../../services/sector.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-salon-detail-assign-data',
  templateUrl: './salon-detail-assign-data.component.html',
  styleUrls: ['./salon-detail-assign-data.component.scss'],
})
export class SalonDetailAssignDataComponent {
  @Input() salonData!: Salon;
  @Output() updateSalonServices = new EventEmitter<string[]>();

  sectors: any[] = [];
  salonForm!: FormGroup;

  constructor(private sectorSrv: SectorService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getAllSectorTree();
  }

  getAllSectorTree() {
    this.sectorSrv.getSectorTree().subscribe({
      next: (data) => {
        this.sectors = data;
        this.initForm();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  initForm() {
    // Initialize form controls for all sectors and children
    const group: any = {};
    this.sectors.forEach((sector) => {
      group[sector._id] = [this.salonData.service_ids.includes(sector._id)];
      if (sector.children) {
        sector.children.forEach((child: any) => {
          group[child._id] = [this.salonData.service_ids.includes(child._id)];
        });
      }
    });

    // Initialize the form group
    this.salonForm = this.fb.group(group);
  }

  onSectorChange(sector: any, event: any) {
    const selectedServices = Object.keys(this.salonForm.controls)
      .filter((key) => this.salonForm.get(key)?.value)
      .map((key) => key);

    console.log('Selected Services:', selectedServices);
    this.updateSalonServices.emit(selectedServices);
  }
}
