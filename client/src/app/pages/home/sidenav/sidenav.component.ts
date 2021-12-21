import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public takeATour(): void {}

  public scrollIntoView(element: string): void {
    const node = document.getElementsByClassName(element)[0];
    node?.scrollIntoView({ behavior: 'smooth' });
  }
}
