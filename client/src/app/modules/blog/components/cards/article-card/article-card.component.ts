import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
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
export class ArticleCardComponent implements OnInit, OnDestroy {
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

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private articles: ArticlesService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

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
    this.articles.duplicateArticle(this.data.id).subscribe(
      (res) => {
        if (res.success) {
          this.snackbar.open('The article was duplicated', 'Close', {
            duration: 5000,
            panelClass: 'alert-success',
          });
        } else {
          this.onDuplicationError(res.data);
        }
      },
      (err) => {
        this.onDuplicationError(err);
      }
    );
  }

  private onDuplicationError(err: any): void {
    this.subscriptions.add(
      this.snackbar
        .open('Could not replicate article', 'Try Again', {
          duration: 5000,
          panelClass: 'alert-error',
        })
        .onAction()
        .subscribe(() => {
          this.duplicateArticle();
        })
    );
  }

  public get authorLink(): string {
    return `/authors/${this.data.author.slug}`;
  }

  public editArticle(): void {
    this.subscriptions.add(
      this.dialog
        .open(EditArticleDialogComponent, { data: this.data })
        .afterClosed()
        .pipe(takeWhile((data) => !!data))
        .subscribe(() => {
          this.snackbar.open('Article was successfully updated', 'Close', {
            duration: 5000,
            panelClass: 'alert-success',
          });
        })
    );
  }

  public deleteArticle(): void {
    this.subscriptions.add(
      this.dialog
        .open(DeleteArticleDialogComponent, { data: this.data })
        .afterClosed()
        .pipe(takeWhile((data) => !!data))
        .subscribe(() => {
          this.snackbar
            .open('Article was successfully deleted.', 'Undo', {
              duration: 5000,
              panelClass: 'alert-error',
            })
            .onAction()
            .subscribe(() => {
              this.recoverArticle();
            });
        })
    );
  }

  public recoverArticle(): void {
    this.articles.recoverArticle(this.data.id).subscribe(
      (res) => {
        if (res.success) {
          this.snackbar.open('The article was recovered', 'Close', {
            duration: 5000,
            panelClass: 'alert-success',
          });
        } else {
          this.onRecoveryError(res.data);
        }
      },
      (err) => {
        this.onRecoveryError(err);
      }
    );
  }

  private onRecoveryError(err: any): void {
    this.subscriptions.add(
      this.snackbar
        .open('The article could not be recovered', 'Try Again', {
          duration: 5000,
          panelClass: 'alert-warning',
        })
        .onAction()
        .subscribe(() => {
          this.recoverArticle();
        })
    );
  }

  public readMore(): void {
    this.router.navigateByUrl(`/blog/articles/article/${this.data.slug}`);
  }
}
