import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../model/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  page: number = 1;
  size: number = 10;
  menu: Menu[] = [];

  constructor(private menuSrv: MenuService) {}

  ngOnInit() {
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
}
