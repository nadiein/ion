import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Article } from './article.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    constructor(private http: HttpClient) { }

    noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

    uploadForm(article):Observable<string> {
        let headers = new HttpHeaders({'Accept':'text/plain'});
        return this.http.post(environment.apiBaseUrl + '/createArticle', article, {headers, responseType:"text"});
    }

    uploadFile(file:File):Observable<string> {
        let formData:FormData = new FormData();
        formData.append('file', file);
        let headers = new HttpHeaders({'Accept':'text/plain'});
        return this.http.post(environment.apiBaseUrl + '/pictures', formData, {headers, responseType:"text"});
    }

}
