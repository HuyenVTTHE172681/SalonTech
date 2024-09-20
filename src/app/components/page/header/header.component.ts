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
  isShowChangePassword: boolean = false;
  isLoading: boolean = false;
  showIcon: boolean = false;
  passwordType: string = 'password';

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

  onLogOut() {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
    localStorage.removeItem('loggedIn');
  }

  onChange() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.showIcon = true;
      console.log(this.showIcon);
    } else {
      this.passwordType = 'password';
      this.showIcon = false;
      console.log(this.showIcon, this.passwordType);
    }
  }
}
