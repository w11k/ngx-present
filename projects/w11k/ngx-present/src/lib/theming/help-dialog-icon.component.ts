import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '../help/help-dialog.component';

@Component({
  selector: 'ngx-present-help-dialog-icon',
  template: `
    <button mat-icon-button (click)="showHelpDialog()">
      <mat-icon>help_outline</mat-icon>
    </button>
  `
})
export class HelpDialogIconComponent {
  constructor(private readonly dialog: MatDialog) { }

  showHelpDialog() {
    this.dialog.open(HelpDialogComponent);
  }
}
