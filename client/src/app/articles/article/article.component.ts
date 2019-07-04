import { Component, Input } from '@angular/core';
import { Article } from 'src/app/shared/article.model';

@Component({
    selector: 'article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

    @Input() article: Article;

    get articleCreatedDate() {
        return this.article && this.article.created ? new Date(this.article.created).toLocaleString() : null;
    }

    get articleUpdatedDate() {
        return this.article && this.article.updated ? new Date(this.article.updated).toLocaleString() : null;
    }
}
