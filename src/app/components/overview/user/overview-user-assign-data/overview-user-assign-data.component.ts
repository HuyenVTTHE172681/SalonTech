import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Menu } from 'primeng/menu';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { group } from '@angular/animations';
import { MenuService } from '../../../../services/menu.service';
import { User } from '../../../../model/user';

@Component({
  selector: 'app-overview-user-assign-data',
  templateUrl: './overview-user-assign-data.component.html',
  styleUrl: './overview-user-assign-data.component.scss',
})
export class OverviewUserAssignDataComponent implements OnInit {
  @Input() newUserData!: User;
  @Output() updateUserMenu = new EventEmitter<string[]>();

  userForm!: FormGroup;
  page: number = 1;
  size: number = 10;
  menu: any[] = [];
  selectedMenus: string[] = [];

  constructor(private menuSrv: MenuService, private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('Menu');
    this.getAllMenu();
  }

  getAllMenu() {
    this.menuSrv.getAllMenu(this.page, this.size).subscribe({
      next: (data) => {
        console.log('Menu: ', this.menu);
        this.menu = data.items;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  initForm() {
    this.menu.forEach((menus) => {
      this.userForm.addControl(
        menus._id,
        new FormControl(menus.checked || false)
      ); // Add control for each menu item
    });

    // Initialize the form group
    this.userForm = this.fb.group(group);
  }

  // @Input() data: any; // Nhận object từ component cha
  // myForm: FormGroup;

  // constructor(private fb: FormBuilder) {}

  // ngOnInit(): void {
  //   // Khởi tạo form
  //   this.myForm = this.fb.group({
  //     description: [''],
  //   });
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['data']) {
  //     // Nếu object data thay đổi, cập nhật lại giá trị description trong form
  //     this.myForm.patchValue({
  //       description: this.data.description,
  //     });
  //   }
  // }
  onMenuChange(menu: any, event: any) {
    if (event.target.checked) {
      this.selectedMenus.push(menu._id);
    } else {
      this.selectedMenus = this.selectedMenus.filter((id) => id !== menu._id);
    }
    this.updateUserMenu.emit(this.selectedMenus);
  }
}
