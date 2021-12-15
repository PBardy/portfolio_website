import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Blog } from '../../../definitions';

@Component({
  selector: 'app-articles-table',
  templateUrl: './articles-table.component.html',
  styleUrls: ['./articles-table.component.scss'],
})
export class ArticlesTableComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input()
  public data: Blog.Article[] = [];

  @Input()
  public pageSize = 5;

  @Input()
  public pageSizeOptions = [5, 10, 25, 100];

  // Table view
  public results = new MatTableDataSource<Blog.Article>([]);
  public selection = new SelectionModel<Blog.Article>(true, []);
  public columns = ['select', 'title', 'description', 'author'];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.results = new MatTableDataSource<Blog.Article>(this.data);
      this.results.sort = this.sort;
      this.results.paginator = this.paginator;
    }
  }

  ngAfterViewInit(): void {
    this.results.sort = this.sort;
    this.results.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  public get resultsLength(): number {
    return this.results.data.length;
  }

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.results.data.length;
    return numSelected === numRows;
  }

  public masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.results.data);
  }
}
