import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Auth, Blog } from '../../../definitions';
import { ArticlesService } from '../../../services/articles.service';
import { AuthState } from '../../../services/auth.service';
import { DeleteArticleDialogComponent } from '../../dialogs/delete-article-dialog/delete-article-dialog.component';
import { EditArticleDialogComponent } from '../../dialogs/edit-article-dialog/edit-article-dialog.component';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {
  @ViewChild(MatMenuTrigger)
  public menu: MatMenuTrigger;

  @ViewChild(MatCheckbox)
  public checkbox: MatCheckbox;

  @Input()
  public data: Blog.Article;

  @Input()
  public auth: AuthState;

  // Context menu position
  public menuX: number = 0;
  public menuY: number = 0;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private articles: ArticlesService
  ) {}

  ngOnInit(): void {}

  @HostListener('dblclick', ['$event'])
  public onDoubleLeftClick(event: MouseEvent): void {
    event.preventDefault();
    this.checkbox.toggle();
  }

  @HostListener('contextmenu', ['$event'])
  public onRightClick(event: MouseEvent): void {
    event.preventDefault();
    this.menuX = event.x;
    this.menuY = event.y;
    this.menu.openMenu();
  }

  public get selected(): boolean {
    return !!this.checkbox?.checked;
  }

  public selectArticle(): void {
    this.checkbox.toggle();
  }

  public duplicateArticle(): void {
    this.articles.duplicateArticle(this.data).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        this.snackbar.open('Could not replicate article');
      }
    );
  }

  public get authorLink(): string {
    return `/authors/${this.data.author.slug}`;
  }

  public editArticle(): void {
    this.dialog.open(EditArticleDialogComponent, { data: this.data });
  }

  public deleteArticle(): void {
    this.dialog.open(DeleteArticleDialogComponent, { data: this.data });
  }

  public readMore(): void {
    this.router.navigateByUrl(`/blog/articles/article/${this.data.slug}`);
  }
}
