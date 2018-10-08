import { Movie } from './movie';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class dataService {
    private movies: Movie[] = [];
    movieId: number = 1;
    constructor(private http: HttpClient) { }
    getMoviesFromServer(url): Observable<any> {
        return this.http.get(url);
    }
    getMoviesList(): Movie[] {
        return this.movies;
    }
    addMovie(title: string, year: number, runtime: string, genre: string, director: string) {
        this.movies.push(new Movie(this.movieId, title, year, runtime, genre, director));
        this.movieId++;
    }
    checkIfMovieExists(movieTitle: string): number {
        let result = this.movies.filter(movie => movie.title.toLowerCase() === movieTitle.toLowerCase());
        return result.length;
    }
}
