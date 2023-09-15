import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-order-status-dialog',
  templateUrl: './update-order-status-dialog.component.html',
  styleUrls: ['./update-order-status-dialog.component.scss'],
})
export class UpdateOrderStatusDialogComponent {
  newStatus: string = ''; // Initialize with an empty string or default status

  constructor(
    public dialogRef: MatDialogRef<UpdateOrderStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSaveClick(): void {
    this.dialogRef.close(this.newStatus);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
