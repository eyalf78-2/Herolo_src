import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { Movie } from '../../model/movie';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { dataService } from '../../model/dataservice';

export interface DialogData {  
  movieToEdit:Movie;  
}
@Component({
  selector: 'app-remove-confirmation-dialog',
  templateUrl: './remove-confirmation-dialog.component.html',
  styleUrls: ['./remove-confirmation-dialog.component.css']
})
export class RemoveConfirmationDialogComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<RemoveConfirmationDialogComponent>,private dataservice:dataService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onCancel(): void {
      this.dialogRef.close();
    }
    onRemove(movie): void {
      this.dialogRef.close(movie);
    }
    ngOnInit() {      
      this.buildForm();
    }
    buildForm()  {
     
    }
  

}
