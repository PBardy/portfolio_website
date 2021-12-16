import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-article-dialog',
  templateUrl: './edit-article-dialog.component.html',
  styleUrls: ['./edit-article-dialog.component.scss'],
})
export class EditArticleDialogComponent implements OnInit {
  public form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    markdown: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    caption: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditArticleDialogComponent>
  ) {}

  ngOnInit(): void {}

  public get title(): FormControl {
    return this.form.controls.title as FormControl;
  }

  public get description(): FormControl {
    return this.form.controls.description as FormControl;
  }

  public get markdown(): FormControl {
    return this.form.controls.markdown as FormControl;
  }

  public clear(): void {
    this.dialogRef.close(false);
  }

  public save(): void {
    // add save logic
    this.dialogRef.close(true);
  }
}
