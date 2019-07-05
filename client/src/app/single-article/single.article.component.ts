import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/shared/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Article, ArticleModel } from '../shared/article.model';
import { faCloudUploadAlt} from '@fortawesome/free-solid-svg-icons';
import { ButtonVo, ButtonKind, ButtonColor } from './button-element/button-element.component';
import { ConfirmService } from '../services/confirm.service';
import { ConfirmButton } from '../services/confirm.message';

@Component({
    selector: 'single-article',
    templateUrl: './single.article.component.html',
    styleUrls: ['./single.article.component.css']
})
export class SingleArticleComponent implements OnInit {

    sub: Subscription;
    article: Article = new Article();
    articleDto: ArticleModel = new ArticleModel();
    articleId: number;
    editMode: boolean;
    isUploading: boolean;
    errorMessage: any;
    faCloudUploadAlt = faCloudUploadAlt;
    buttons: ButtonVo[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public articleService: ArticleService,
        public confirmService: ConfirmService
    ) { }

    get articleCreatedDate() {
        return this.article && this.article.created ? new Date(this.article.created).toLocaleString() : null;
    }

    get articleUpdatedDate() {
        return this.article && this.article.updated ? new Date(this.article.updated).toLocaleString() : null;
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.articleId = params['id'];
            this.articleService.getArticle(this.articleId).subscribe(res => {
                console.log('res => ', res)
                Object.assign(this.article, res);
            });
        })

        this.buttons = [
            new ButtonVo(0, 'Save', false, ButtonColor.Primary),
            new ButtonVo(1, 'Edit', true, ButtonColor.Primary),
            new ButtonVo(2, 'Cancel', false, ButtonColor.Warn),
            new ButtonVo(3, 'Delete', true, ButtonColor.Warn)
        ];
    }

    onDispatchButtonEvent(button:ButtonVo) {
        if (button.kind == ButtonKind.Edit) {
            this.editMode = true;
            button.visibility = false;
            this.buttons.find(button => button.kind == ButtonKind.Delete).visibility = false;
        } else if (button.kind == ButtonKind.Save) {
            console.log('save event => ');
            this.updateArticle(this.article);
            this.editMode = false;
        } else if (button.kind == ButtonKind.Delete) {
            console.log('delete event => ');
            this.deleteArticle(this.articleId);
        } else if (button.kind == ButtonKind.Cancel) {
            this.editMode = false;
        }

        if (this.editMode) {
            this.buttons.forEach(button => {
                if (button.kind != ButtonKind.Edit && button.kind != ButtonKind.Delete) button.visibility = true;
            })
        } else {
            this.buttons.forEach(button => {
                if (button.kind != ButtonKind.Edit && button.kind != ButtonKind.Delete) {
                    button.visibility = false;
                } else {
                    button.visibility = true;
                }
            })
        }

    }

    updateArticle(article:Article) {
        this.toDto(article);
        let formData:FormData = new FormData();
        formData.append('id', String(this.articleDto.id));
        formData.append('title', this.articleDto.title);
        formData.append('description', this.articleDto.description);
        this.articleDto.image ? formData.append('image', this.articleDto.image) : null;
        this.articleService.updateArticle(formData).subscribe();
    }

    deleteArticle(id) {
        this.confirmService.warning(
            'Are you sure u wanna delete this Article?',
            [new ConfirmButton('Yes, i\'m totaly sure', () => {
                this.articleService.deleteArticle(this.articleId).subscribe(res => {
                    console.log('res');
                    this.router.navigateByUrl('/articles');
                }, err => {
                    this.confirmService.warning(err)
                });
                return null;
            }),
            new ConfirmButton('Give me a sec, i\'ll ask my mom', null)]);
    }

    onArticleImageUpload(event:any) {
        console.log('upload article image => ')
        if (event.target.files && event.target.files[0]) {
            let file: File = event.target.files[0];
            this.articleDto.image = file;
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

    toDto(article: Article) {
        this.articleDto.id = this.articleId;
        this.articleDto.title = article.title;
        this.articleDto.description = article.description;
    }
  
  // TODO dbl click editing
  // TODO keyboard editing events ESC, Enter etc
  // TODO PATCH single edited article field

}
