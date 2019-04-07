import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Article } from './article.model';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    article: Article = {
        id: null,
        title: '',
        description: '',
        image: '',
        created: new Date(),
        updated: new Date()
    }

    constructor(private http: HttpClient) { }

    postArticle(article: Article){
        return this.http.post(environment.apiBaseUrl + '/createArticle', article);
    }

}
