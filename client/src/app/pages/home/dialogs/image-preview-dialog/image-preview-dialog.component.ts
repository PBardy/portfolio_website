import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Blog } from 'src/app/modules/blog/definitions';

@Component({
  selector: 'app-image-preview-dialog',
  templateUrl: './image-preview-dialog.component.html',
  styleUrls: ['./image-preview-dialog.component.scss'],
})
export class ImagePreviewDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Blog.Article,
    public dialogRef: MatDialogRef<ImagePreviewDialogComponent>
  ) {}

  ngOnInit(): void {}
}
