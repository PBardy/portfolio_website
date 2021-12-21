import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Project } from 'src/app/definitions';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  public searchForm = new FormGroup({
    searchTerm: new FormControl(''),
    orderBy: new FormControl(''),
    filterBy: new FormControl(['HTML', 'CSS', 'JavaScript']),
  });

  public projects: Project[] = projects;

  constructor() {}

  ngOnInit(): void {
    this.searchForm.controls.filterBy.patchValue(this.tags);
  }

  public get tags(): string[] {
    return Array.from(new Set(this.projects.map((p) => p.tags).flat()));
  }
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
