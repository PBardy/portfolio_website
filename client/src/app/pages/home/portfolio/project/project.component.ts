import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Project } from 'src/app/definitions';
import { ImagePreviewDialogComponent } from '../../dialogs/image-preview-dialog/image-preview-dialog.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() public data: Project;

  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}

  public openImagePreview(): void {
    this.dialog.open(ImagePreviewDialogComponent, {
      data: this.data,
    });
  }

  public openSourceCode(): void {
    this.router.navigateByUrl(this.data.repoLink!);
  }

  public openDemo(): void {
    this.router.navigateByUrl(this.data.demoLink!);
  }
}
