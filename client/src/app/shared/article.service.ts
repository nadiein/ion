import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Article } from './article.model';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    constructor(private http: HttpClient) { }

    noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

    postArticle(form) {
        console.log('article => ', form)
        return this.http.post(environment.apiBaseUrl + '/createArticle', form, this.noAuthHeader);
    }

}
