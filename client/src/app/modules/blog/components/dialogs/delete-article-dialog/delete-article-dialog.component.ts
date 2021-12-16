import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Blog } from '../../../definitions';
import { ArticlesService } from '../../../services/articles.service';

@Component({
  selector: 'app-delete-article-dialog',
  templateUrl: './delete-article-dialog.component.html',
  styleUrls: ['./delete-article-dialog.component.scss'],
})
export class DeleteArticleDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Blog.Article,
    private articles: ArticlesService,
    private dialogRef: MatDialogRef<DeleteArticleDialogComponent>
  ) {}

  ngOnInit(): void {}

  public cancel(): void {
    this.dialogRef.close();
  }

  public deleteArticle(): void {
    this.articles.deleteArticle(this.data.id).subscribe(
      (res) => {},
      (err) => {}
    );
  }
}
