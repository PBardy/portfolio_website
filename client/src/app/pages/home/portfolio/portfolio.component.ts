import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/definitions';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  public projects: Project[] = projects;

  constructor() {}

  ngOnInit(): void {}
}

const project: Project = {
  id: 0,
  slug: 'snake',
  title: 'Snake',
  description: `
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid ullam in reprehenderit obcaecati 
    incidunt quidem, nobis possimus totam iusto, dignissimos fugiat adipisci optio sit. Expedita ipsam 
    accusantium repudiandae explicabo ad?
  `,
  thumbnail: '',
  tags: ['HTML', 'CSS', 'JavaScript'],
};

const projects = new Array(10).fill(project);
