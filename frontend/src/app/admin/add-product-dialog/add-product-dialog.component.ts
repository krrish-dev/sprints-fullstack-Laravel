
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
})
export class AddProductDialogComponent {
  product: any = {
    image: 'Artwork1.jpg'

  }; // Initialize an empty product object

  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSubmit(): void {
    // Close the dialog and pass the product data to the parent component
    this.dialogRef.close(this.product);
  }

  onCancel(): void {
    // Close the dialog without adding a product
    this.dialogRef.close();
  }

}

