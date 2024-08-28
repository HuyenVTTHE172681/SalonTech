import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
})
export class ChildComponent {
  childText = 'Hello from Child Component';

  changeText() {
    this.childText = 'Text Updated by ViewChild';
  }
}
