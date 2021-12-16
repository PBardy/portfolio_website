import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { EditArticleDialogComponent } from '../../components/dialogs/edit-article-dialog/edit-article-dialog.component';
import { SettingsDialogComponent } from '../../components/dialogs/settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  constructor(private dialog: MatDialog, private snackbar: MatSnackBar) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public addArticle(): void {
    this.subscriptions.add(
      this.dialog
        .open(EditArticleDialogComponent)
        .afterClosed()
        .pipe(takeWhile((data) => !!data))
        .subscribe(() => {
          this.snackbar.open('Article was successfully added.', 'Close', {
            duration: 3000,
            panelClass: 'alert-success',
          });
        })
    );
  }

  public settings(): void {
    this.subscriptions.add(
      this.dialog
        .open(SettingsDialogComponent)
        .afterClosed()
        .pipe(takeWhile((data) => !!data))
        .subscribe(() => {
          this.snackbar.open('Settings successfully updated', 'Close', {
            duration: 5000,
            panelClass: 'alert-success',
          });
        })
    );
  }
}
