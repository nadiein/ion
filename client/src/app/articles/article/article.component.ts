import { Component, Input } from '@angular/core';
import { Article } from 'src/app/shared/article.model';

@Component({
    selector: 'article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

    @Input() article: Article;
}
