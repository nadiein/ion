import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/shared/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from '../shared/article.model';
import { faCloudUploadAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'single-article',
    templateUrl: './single.article.component.html',
    styleUrls: ['./single.article.component.css']
})
export class SingleArticleComponent implements OnInit {

    sub: Subscription;
    article: Article = new Article();
    editMode: boolean;
    faCloudUploadAlt = faCloudUploadAlt;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public articleService: ArticleService
    ) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            const id = params['id'];
            this.articleService.getArticle(id).subscribe(res => {
                console.log('res => ', res)
                Object.assign(this.article, res);
            });
        })
    }

    onArticleChangesSave() {
        this.editMode = false;
        console.log('save changes => ')
    }

    onArticleEdit() {
        this.editMode = true;
        console.log('edit article => ')
    }

    onArticleImageUpload() {
        console.log('upload article image => ')
    }

    onArticleDelete() {
        console.log('delete article => ')
    }

}
