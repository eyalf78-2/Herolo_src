import { errorService } from './../../model/errorsservice';
import { RemoveNonEnglishCharPipe } from './../remove-non-english-char.pipe';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Movie } from '../../model/movie';
import { dataService } from '../../model/dataservice';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface DialogData {
  movieToEdit: Movie;
}
@Component({
  selector: 'app-movie-edit-popup',
  templateUrl: './movie-edit-popup.component.html',
  styleUrls: ['./movie-edit-popup.component.css']
})
export class MovieEditPopupComponent implements OnInit {
  editMovieForm: FormGroup;
  titleCtrl: FormControl;
  yearCtrl: FormControl;
  runtimeCtrl: FormControl;
  genreCtrl: FormControl;
  directorCtrl: FormControl;
  movieExists: boolean;
  constructor(
    public dialogRef: MatDialogRef<MovieEditPopupComponent>,private errorservice:errorService, private dataservice: dataService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
    getRequiredErrorMessage(ctrl:FormControl):string {   
     return this.errorservice.getRequiredErrorMessage(ctrl);
    }

  onCancel(): void {
    this.dialogRef.close("Cancel");
  }
  onSave(movie): void {    
    if (this.dataservice.checkIfMovieExists(<string>this.titleCtrl.value)==1) {    
        this.dialogRef.close();
    }
    else
      this.movieExists = true;

  }
  changeMovieExistsToFalse() {
    if (this.movieExists == true)
      this.movieExists = false;
  }
  ngOnInit() {
    this.titleCtrl = new FormControl('', Validators.required);
    this.yearCtrl = new FormControl('', [Validators.required,
    Validators.minLength(4), Validators.maxLength(4), Validators.pattern("[0-9]*")]);
    this.runtimeCtrl = new FormControl('', [Validators.required,Validators.pattern("[0-9]*")]);
    this.genreCtrl = new FormControl('', Validators.required);;
    this.directorCtrl = new FormControl('', Validators.required);;
    this.buildForm();
  }
  buildForm() {
    this.editMovieForm = new FormGroup({
      title: this.titleCtrl,
      year: this.yearCtrl,
      runtime: this.runtimeCtrl,
      genre: this.genreCtrl,
      director: this.directorCtrl,
    });
  }

}
