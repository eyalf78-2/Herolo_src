import { AddMovieCompnentComponent } from './../add-movie-compnent/add-movie-compnent.component';
import { RemoveConfirmationDialogComponent } from './../remove-confirmation-dialog/remove-confirmation-dialog.component';
import { RemoveNonEnglishCharPipe } from './../remove-non-english-char.pipe';
import { Movie } from './../../model/movie';
import { dataService } from './../../model/dataservice';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MovieEditPopupComponent } from '../movie-edit-popup/movie-edit-popup.component';


@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies: Movie[];
  currentMovie: Movie; 
  editedMovieOriginalTitle: string;
  editedMovieOriginalYear: number;
  editedMovieOriginalRuntime: string;
  editedMovieOriginalGenre: string;
  editedMovieOriginalDirector: string;

  constructor(private dataservice: dataService, public dialog: MatDialog) { }

  ngOnInit() {    
    let urls:String[]=["http://www.omdbapi.com/?t=the+matrix&apikey=633a87db","http://www.omdbapi.com/?t=back%20+to%20+the%20+future&apikey=633a87db",
                      "http://www.omdbapi.com/?t=star+wars&apikey=633a87db"];
    for (let url of urls) {
      this.requestMovieFromService(url);
    }
    this.movies=this.dataservice.getMoviesList();    
  }
  requestMovieFromService (url) {
    this.dataservice.getMoviesFromServer(url).subscribe(
      data =>{
        let runtime:string=data['Runtime'];
        runtime=runtime.replace("min","").replace(/ /g,'');        
        this.dataservice.addMovie(data['Title'],data['Year'],runtime,data['Genre'],data['Director']);       
      },
      err => {
        console.log(err);
          }
    );
  }
  openEditDialog(movie:Movie): void {   
    this.currentMovie = movie;
    this.editedMovieOriginalTitle = movie.title;
    this.editedMovieOriginalYear = movie.year;
    this.editedMovieOriginalRuntime = movie.runtime;
    this.editedMovieOriginalGenre = movie.genre;
    this.editedMovieOriginalDirector = movie.director;    
    
    const dialogRef = this.dialog.open(MovieEditPopupComponent, {
      width: '450px', 
      height: '500px',     
      data: {movieToEdit: movie },
    });
    dialogRef.afterClosed().subscribe(result => {     
      if (result == "Cancel") {        
        this.currentMovie.title = this.editedMovieOriginalTitle;
        this.currentMovie.year = this.editedMovieOriginalYear;
        this.currentMovie.runtime = this.editedMovieOriginalRuntime;
        this.currentMovie.genre = this.editedMovieOriginalGenre;
        this.currentMovie.director = this.editedMovieOriginalDirector;        
      }
    });
  }
  openRemoveDialog(movie): void {
    const dialogRef = this.dialog.open(RemoveConfirmationDialogComponent, {
      width: '450px',     
      data: {movieToEdit: movie },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result instanceof Movie) {       
        let index = this.dataservice.getMoviesList().findIndex(x => x.id == result.id);        
        this.dataservice.getMoviesList().splice(index,1);        
      }      
    });
  }
  openAddMovieDialog(): void {        
    const dialogRef = this.dialog.open(AddMovieCompnentComponent, {
      width: '450px',  
      height: '500px'      
    });    
   
  }
}
