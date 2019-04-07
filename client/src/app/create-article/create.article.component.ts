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

    constructor(
        private articleService: ArticleService,
        private router: Router
    ) { }

    ngOnInit() { }

    onSubmit(form: NgForm) {
        console.log('article => ', form.value)
        // this.articleService.postArticle(form).subscribe(res => {
        //     console.log(res)
        //     this.router.navigateByUrl('/userProfile');
        // }, error => {
        //     this.serverErrorMessages = error.error.message;
        // });
    }

}
