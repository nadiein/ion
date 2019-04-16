import { Article } from './../shared/article.model';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../shared/article.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    selector: 'create-article',
    templateUrl: './create.article.component.html',
    styleUrls: ['./create.article.component.css']
})
export class CreateArticleComponent implements OnInit {

    showSucessMessage: boolean;
    serverErrorMessages: string;
    article: Article = new Article();

    constructor(
        private articleService: ArticleService,
        private router: Router
    ) { }

    ngOnInit() { }

    onSubmit(form: NgForm) {
        this.article.title = form.value.title;
        this.article.description = form.value.description;
        this.articleService.postArticle(form.value).subscribe(res => {
            console.log(res)
            this.router.navigateByUrl('/userProfile');
        }, error => {
            this.serverErrorMessages = error.error.message;
        });
    }

    onInputFileChange(event) {
        this.article.image = event.target.files[0];
        this.article.created = event.target.files[0].lastModifiedDate;
        this.article.updated = event.target.files[0].lastModifiedDate;
    }

}
