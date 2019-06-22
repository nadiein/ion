import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LogInComponent } from './user/log-in/log-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditUserProfileComponent } from './edit-user-profile/edit.user.profile.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './articles/article/article.component';
import { CreateArticleComponent } from './create-article/create.article.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
//routes
import { AppRoutes } from './routes';
//services
import { UserService } from './shared/user.service';

@NgModule({
    declarations: [
        AppComponent,
        UserComponent,
        SignUpComponent,
        LogInComponent,
        PagenotfoundComponent,
        UserProfileComponent,
        EditUserProfileComponent,
        CreateArticleComponent,
        ArticlesComponent,
        ArticleComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes),
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        AuthGuard,
        UserService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
