import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable, of, from, forkJoin } from 'rxjs';
import { Article } from './article.model';
import { catchError, tap, switchMap, map, mergeMap, toArray } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    constructor(private http: HttpClient) { }

    protected handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error); // TODO: show toastr
          return of(result as T);
        }
    };

    noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

    uploadForm(article):Observable<string> {
        let headers = new HttpHeaders({'Accept':'multipart/form-data'});
        return this.http.post(environment.apiBaseUrl + '/articles', article, {headers, responseType:"text"});
    }

    getArticles():Observable<Article[]> {
        let headers = new HttpHeaders({'Accept':'text/plain'});
        return this.http.get(environment.apiBaseUrl + '/articles', { headers, responseType: "json" }).pipe(
            map(items => {
                let data = [];
                for (let i in items) {
                    data.push(items[i])
                }
                return data.map(el => {
                    return {title: el.title, description: el.description, image: el.image['id']}
                })
            })
        )
    }

    uploadFile(file:File):Observable<string> {
        let formData:FormData = new FormData();
        formData.append('file', file);
        let headers = new HttpHeaders({'Accept':'text/plain'});
        return this.http.post(environment.apiBaseUrl + '/pictures', formData, {headers, responseType:"text"});
    }

}
