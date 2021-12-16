import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { EditArticleDialogComponent } from '../../components/dialogs/edit-article-dialog/edit-article-dialog.component';
import { SearchDialogComponent } from '../../components/dialogs/search-dialog/search-dialog.component';
import { SettingsDialogComponent } from '../../components/dialogs/settings-dialog/settings-dialog.component';
import { SignInDialogComponent } from '../../components/dialogs/sign-in-dialog/sign-in-dialog.component';
import { Auth, Blog } from '../../definitions';
import { LoadingState } from '../../models/loading-state';
import { ArticlesService } from '../../services/articles.service';
import { AuthService, AuthState } from '../../services/auth.service';
import { Hotkeys } from '../../services/hotkeys.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatDrawer, { static: true }) sidenav: MatDrawer;
  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger: MatMenuTrigger;

  public searchForm = new FormGroup({
    searchTerm: new FormControl(''),
  });

  public view: 'GRID' | 'TABLE' | 'LIST' = 'GRID';
  public viewOptions = { standalone: true };
  public articlesState = new LoadingState<Blog.Article[]>();
  public authState: AuthState;

  private subscriptions = new Subscription();

  constructor(
    private dialog: MatDialog,
    private hotkeys: Hotkeys,
    private auth: AuthService,
    private snackbar: MatSnackBar,
    private articlesService: ArticlesService
  ) {}

  ngOnInit(): void {
    this.addShortCuts();
    this.getArticles();
    this.getAuthState();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private addShortCuts(): void {
    this.subscriptions.add(
      this.hotkeys.addShortcut({ keys: 'tab' }).subscribe(() => {
        this.sidenav.toggle();
      })
    );

    this.subscriptions.add(
      this.hotkeys.addShortcut({ keys: 'control.s' }).subscribe(() => {
        this.dialog.open(SearchDialogComponent);
      })
    );

    this.subscriptions.add(
      this.hotkeys.addShortcut({ keys: 'control.=' }).subscribe(() => {
        this.dialog.open(EditArticleDialogComponent);
      })
    );
  }

  private getAuthState(): void {
    this.subscriptions.add(
      this.auth.authStateEvent.subscribe((event) => {
        this.authState = event;
      })
    );
  }

  private getArticles(): void {
    this.articlesState.reset();
    this.articlesService.getAllArticles().subscribe(
      (res) => {
        this.articlesState.setSuccessState(res);
      },
      (err) => {
        this.articlesState.setErrorState();
      }
    );
  }

  public addArticle(): void {
    this.subscriptions.add(
      this.dialog
        .open(EditArticleDialogComponent)
        .afterClosed()
        .pipe(takeWhile((data) => !!data))
        .subscribe(() => {
          this.snackbar.open('Article was successfully added.', 'Close', {
            //duration: 3000,
            panelClass: 'alert-success',
          });
        })
    );
  }

  public signIn(): void {
    this.dialog.open(SignInDialogComponent);
  }

  public signOut(): void {
    this.auth.signOut();
  }

  public myArticles(): void {}

  public settings(): void {
    this.dialog.open(SettingsDialogComponent);
  }
}
