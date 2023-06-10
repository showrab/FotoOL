import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Photo } from './model/photo';
import { Observable } from 'rxjs';
import {HighScore} from "./model/high-score";
import {Tour} from "./model/tour";
import {EnvironmentService} from "./environment.service";

@Injectable({
  providedIn: 'root'
})
export class FotoOlService {
  private readonly photoServiceUrl: string = '/';

  constructor(private http: HttpClient, private env: EnvironmentService) {
    this.photoServiceUrl = env.getValue('apiUrl');
  }

  public findAll(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photoServiceUrl + 'photos');
  }

  public findAllByTour(tour: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photoServiceUrl + 'photos/'+ tour);
  }

  public savePhoto(photo: Photo) {
    return this.http.post(this.photoServiceUrl + 'photo', photo);
  }

  public deletePhoto(id: number) {
    return this.http.delete(this.photoServiceUrl + 'photo/delete/'+id);
  }

  public findTeamName(teamName: string): Observable<HighScore[]> {
    return this.http.get<HighScore[]>(this.photoServiceUrl + "team/" + teamName);
  }
  getHighScore() {
    return this.http.get<HighScore>(this.photoServiceUrl + "highScore");
  }

  getHighScoreTour(tour: string | undefined) {
    return this.http.get<HighScore>(this.photoServiceUrl + "highScore/" + tour);
  }
  saveScore(score: HighScore) {
    return this.http.post(this.photoServiceUrl + "highScore", score);
  }
  public deleteHighScore(id: number) {
    return this.http.delete(this.photoServiceUrl + 'highScore/delete/'+id);
  }
  // Tour
  getTour() {
    return this.http.get<Tour[]>(this.photoServiceUrl + "tour");
  }
  getTourList() {
    return this.http.get<Tour[]>(this.photoServiceUrl + "tourList");
  }
  saveTour(tour: Tour) {
    return this.http.post<Tour[]>(this.photoServiceUrl + "tour", tour);
  }
  deleteTour(id: number) {
    return this.http.delete(this.photoServiceUrl + 'tour/delete/'+id);
  }

  getBaseUrl() {
    return this.photoServiceUrl;
  }

  login(password: string) {
    return this.http.post<boolean>(this.photoServiceUrl + 'admin/login', password);
  }
}
