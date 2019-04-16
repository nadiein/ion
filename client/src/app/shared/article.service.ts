import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Article } from './article.model';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    constructor(private http: HttpClient) { }

    postArticle(form) {
        console.log('article => ', form)
        return this.http.post(environment.apiBaseUrl + '/createArticle', form);
    }

}
