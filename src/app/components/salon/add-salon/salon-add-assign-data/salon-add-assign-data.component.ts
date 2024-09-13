import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SectorService } from '../../../../services/sector.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Salon } from '../../../../model/salon';

@Component({
  selector: 'app-salon-add-assign-data',
  templateUrl: './salon-add-assign-data.component.html',
  styleUrl: './salon-add-assign-data.component.scss',
})
export class SalonAddAssignDataComponent implements OnInit {
  @Input() salonData!: Salon;
  @Output() updateSalonServices = new EventEmitter<string[]>();

  sectors: any[] = [];
  salonForm!: FormGroup;
  selectedServices: string[] = []; // Array to track selected service IDs

  constructor(private sectorSrv: SectorService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getAllSectorTree();
    this.initForm();
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
      group[sector._id] = [sector.checked || false];
      if (sector.children) {
        sector.children.forEach((child: any) => {
          group[child._id] = [child.checked || false];
        });
      }
    });
    this.salonForm = this.fb.group(group);
  }

  onSectorChange(sector: any, event: any) {
    if (event.target.checked) {
      this.selectedServices.push(sector._id);
    } else {
      this.selectedServices = this.selectedServices.filter(
        (id) => id !== sector._id
      );
    }
    this.updateSalonServices.emit(this.selectedServices);
  }
}
