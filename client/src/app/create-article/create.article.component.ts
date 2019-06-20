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
    isUploading: boolean;
    errorMessage: any;

    constructor(
        private articleService: ArticleService,
        private router: Router
    ) { }

    ngOnInit() { }

    onSubmit(form: NgForm) {
        let formData:FormData = new FormData();
        formData.append('title', form.value.title);
        formData.append('description', form.value.description);
        formData.append('image', this.article.image);
        console.log('form => ', form)
        console.log('form data => ', formData)
        // this.article.image = form.value;
        this.articleService.uploadForm(formData).subscribe(res => {
            console.log(res)
            // this.router.navigateByUrl('/userProfile');
        }, error => {
            // this.serverErrorMessages = error.error.message;
        });
    }

    uploadFile(event:any) {
        if (event.target.files && event.target.files[0]) {
            let file: File = event.target.files[0];
            this.article.image = file;
            this.isUploading = true;
            this.errorMessage = null;
            console.log('file=> ', file)
            this.articleService.uploadFile(file).subscribe(res => {
                this.isUploading = false;
                console.log('res => ', res);
            },
            error => {
                this.isUploading = false;
                this.errorMessage = 'Error uploading file';
            })
        }
    }

}
