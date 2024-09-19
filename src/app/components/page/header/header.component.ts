import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { Menu } from '../../../model/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  page: number = 1;
  size: number = 10;
  menu: Menu[] = [];
  userName: string | null = '';
  sidebarVisible2: boolean = false;

  constructor(private menuSrv: MenuService, private router: Router) {}

  ngOnInit() {
    console.log('Menu');
    this.userName = localStorage.getItem('userName');
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

  goToHome() {
    this.router.navigate(['/home']);
  }
}
