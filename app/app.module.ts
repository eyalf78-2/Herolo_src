import { dataService } from './../model/dataservice';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MovieEditPopupComponent } from './movie-edit-popup/movie-edit-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RemoveNonEnglishCharPipe } from './remove-non-english-char.pipe';
import { RemoveConfirmationDialogComponent } from './remove-confirmation-dialog/remove-confirmation-dialog.component';
import { AddMovieCompnentComponent } from './add-movie-compnent/add-movie-compnent.component';
import { HttpClientModule } from '@angular/common/http';
import { errorService } from '../model/errorsservice';
@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MovieEditPopupComponent,
    RemoveNonEnglishCharPipe,
    RemoveConfirmationDialogComponent,
    AddMovieCompnentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule  
  ],
  entryComponents: [
    MovieEditPopupComponent,
    RemoveConfirmationDialogComponent,
    AddMovieCompnentComponent
  ],
  providers: [dataService,errorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
