import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Menu } from 'primeng/menu';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from '../../model/user';
import { group } from '@angular/animations';

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
  menus: any[] = [];
  selectedMenus: string[] = [];

  constructor(private menuSrv: MenuService, private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('Menu');
    this.getAllMenu();
  }

  getAllMenu() {
    this.menuSrv.getAllMenu(this.page, this.size).subscribe({
      next: (data) => {
        console.log('Menu: ', this.menus);
        this.menus = data.items;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  initForm() {
    this.menus.forEach((menu) => {
      this.userForm.addControl(
        menu._id,
        new FormControl(menu.checked || false)
      ); // Add control for each menu item
    });

    // Initialize the form group
    this.userForm = this.fb.group(group)
  }
  onMenuChange(menu: any, event: any) {
    if (event.target.checked) {
      this.selectedMenus.push(menu._id);
    } else {
      this.selectedMenus = this.selectedMenus.filter((id) => id !== menu._id);
    }
    this.updateUserMenu.emit(this.selectedMenus);
  }
}
