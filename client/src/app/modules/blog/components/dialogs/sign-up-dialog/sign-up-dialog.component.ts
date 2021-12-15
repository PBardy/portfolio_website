import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialogComponent } from '../sign-in-dialog/sign-in-dialog.component';

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.scss'],
})
export class SignUpDialogComponent implements OnInit {
  public form = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    rpassword: new FormControl('', [Validators.required]),
  });

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  public signIn(): void {
    this.dialog.closeAll();
    this.dialog.open(SignInDialogComponent);
  }

  public signUp(): void {}
}
