import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { IResponeList } from '../../model/common.model';

enum StatusUser {
  ALL = -1,
  ACTIVE = 1,
  INACTIVE = 0,
  KEYWORD = 2,
}

@Component({
  selector: 'app-overview-user-detail',
  templateUrl: './overview-user-detail.component.html',
  styleUrl: './overview-user-detail.component.scss',
})
export class OverviewUserDetailComponent implements OnInit {
  userForm: FormGroup;
  editMode: boolean = false;
  page: number = 1;
  size: number = 5; // display 10 item per page
  status: number = StatusUser.ALL;
  users: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userSrv: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.formBuilder.group({
      _id: [{ value: '', disabled: true }],
      name: [{ value: '', disabled: true }, [Validators.required]],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      status: [{ value: null, disabled: true }, Validators.required],
      phone: [{ value: '', disabled: true }, [Validators.required]],
      modified_by: [{ value: '', disabled: true }],
      modified_date: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id) {
        this.getUserById(id);
      }
    });
  }

  getUserById(id: string): void {
    this.userSrv.getUserById(id).subscribe(
      (data) => {
        console.log('User data fetched from API:', data);
        this.userForm.patchValue(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.userForm.enable();
    } else {
      this.userForm.disable();
    }
  }

  onSubmitFormEditUser(): void {
    if (this.userForm.valid) {
      const updatedUser: User = this.userForm.getRawValue(); // Use getRawValue() to get values of disabled controls as well

      // Convert status from string to number
      updatedUser.status = Number(updatedUser.status);

      console.log('Update User data: ', updatedUser);

      this.userSrv.updateUser(updatedUser).subscribe(
        (res) => {
          console.log('User updated successfully:', res);

          // Confirm if API response reflects the correct updated status
          console.log('Updated User Info from API Response:', res);

          console.log('Updated User Info:', updatedUser);

          this.toggleEditMode();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/home/overview-user']);
  }

  onDelete(): void {
    this.userSrv.deleteUser(this.userForm.get('_id')?.value).subscribe(
      (res) => {
        alert('User deleted successfully');
        console.log('User deleted successfully:', res);
        this.router.navigate(['/home/overview-user']);
      },
      (err) => {
        console.error('Error deleting user:', err);
      }
    );
  }
}
