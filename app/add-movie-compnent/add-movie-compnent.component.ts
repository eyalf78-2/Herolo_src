import { errorService } from './../../model/errorsservice';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { Movie } from '../../model/movie';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { dataService } from '../../model/dataservice';
export interface DialogData {
  movieToEdit: Movie;
}
@Component({
  selector: 'app-add-movie-compnent',
  templateUrl: './add-movie-compnent.component.html',
  styleUrls: ['./add-movie-compnent.component.css']
})
export class AddMovieCompnentComponent implements OnInit {
  addMovieDialog: FormGroup;
  titleCtrl: FormControl;
  yearCtrl: FormControl;
  runtimeCtrl: FormControl;
  genreCtrl: FormControl;
  directorCtrl: FormControl;
  movieExists: boolean;
  constructor(
    public dialogRef: MatDialogRef<AddMovieCompnentComponent>,private errorservice:errorService ,private dataservice: dataService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  getRequiredErrorMessage(ctrl:FormControl) {
    return this.errorservice.getRequiredErrorMessage(ctrl);
  }
  onSubmit() {   
    if (this.dataservice.checkIfMovieExists(<string>this.titleCtrl.value)==0) {
        this.dataservice.addMovie(this.titleCtrl.value, this.yearCtrl.value,this.runtimeCtrl.value, this.genreCtrl.value, this.directorCtrl.value);
        this.dialogRef.close("Added");
    }
    else
      this.movieExists = true;
  }
  
  onCancel(): void {
    this.dialogRef.close("Cancel");
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
    this.addMovieDialog = new FormGroup({
      title: this.titleCtrl,
      year: this.yearCtrl,
      runtime: this.runtimeCtrl,
      genre: this.genreCtrl,
      director: this.directorCtrl,
    });
  }

}
