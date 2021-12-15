import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss'],
})
export class SearchDialogComponent implements OnInit {
  public form = new FormGroup({
    tags: new FormControl(['TAG1']),
    searchTerm: new FormControl(''),
    searchType: new FormControl(['ARTICLES']),
  });

  public tags = [
    { value: 'TAG1', label: 'Tag 1' },
    { value: 'TAG2', label: 'Tag 2' },
    { value: 'TAG3', label: 'Tag 3' },
  ];

  public searchTypes = [
    { value: 'ARTICLES', label: 'Articles' },
    { value: 'COMMENTS', label: 'Comments' },
    { value: 'AUTHOR', label: 'Author' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
