import { Component, OnInit } from '@angular/core';
import { SalonService } from '../../services/salon.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormGroup
import { Router } from '@angular/router';

@Component({
  selector: 'app-salon-add',
  templateUrl: './salon-add.component.html',
  styleUrls: ['./salon-add.component.scss'], // Corrected to 'styleUrls'
})
export class SalonAddComponent implements OnInit {
  salonForm: any; // Changed type to FormGroup

  constructor(
    private salonSrv: SalonService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.salonForm = this.formBuilder.group({
      code: [null, Validators.required],
      name: ['', Validators.required],
      phone: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]], // Corrected Validators
      city: ['', Validators.required],
      district: ['', Validators.required],
      commune: ['', Validators.required],
      short_description: ['', Validators.required],
      opening_from_date: [null, Validators.required],
      opening_to_date: [null, Validators.required],
      rate_average: [null, Validators.required],
      status: [null, Validators.required],
    });
  }

  onSubmitFormAddSalon() {
    if (this.salonForm.valid) {
      const formValue = {
        ...this.salonForm.value,
        status: Number(this.salonForm.value.status),
      };

      this.salonSrv.addSalon(formValue).subscribe(
        (res) => {
          alert('Thêm thành công'); // Corrected Vietnamese accent
          this.router.navigate(['/salon']);
        },
        (err) => {
          console.error('Error adding salon:', err); // Improved error handling
          alert('Lỗi khi thêm salon: ' + err.message); // Display error message
        }
      );
    } else {
      alert('Vui lòng điền đầy đủ thông tin và đúng định dạng!');
    }
  }
}
