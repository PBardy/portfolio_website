import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/definitions';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() public data: Project;

  constructor() {}

  ngOnInit(): void {}
}
