import { ArticleModel } from './../shared/article.model';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../shared/article.service';
import { Router } from '@angular/router';


@Component({
    selector: 'create-article',
    templateUrl: './create.article.component.html',
    styleUrls: ['./create.article.component.css']
})
export class CreateArticleComponent implements OnInit {

    showSucessMessage: boolean;
    serverErrorMessages: string;
    article: ArticleModel = new ArticleModel();
    isUploading: boolean;
    errorMessage: any;

    constructor(
        public articleService: ArticleService,
        private router: Router
    ) { }

    ngOnInit() { }

    onSubmit() {
        let formData:FormData = new FormData();
        formData.append('title', this.article.title);
        formData.append('description', this.article.description);
        formData.append('image', this.article.image);
        
        // this.article.image = form.value;
        this.articleService.uploadForm(formData).subscribe(res => {
            console.log(res)
            this.router.navigateByUrl('/users');
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
