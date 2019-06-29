import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FlexLayoutModule } from '@angular/flex-layout';
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
import { SingleArticleComponent } from './single-article/single.article.component';
import { ButtonElementComponent } from './single-article/button-element/button-element.component';
import { ConfirmComponent } from './services/confirm.component';
//routes
import { AppRoutes } from './routes';
//services
import { UserService } from './shared/user.service';
import { ConfirmService } from './services/confirm.service';

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
        ArticleComponent,
        SingleArticleComponent,
        ButtonElementComponent,
        ConfirmComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes),
        HttpClientModule,
        MaterialModule,
        FontAwesomeModule,
        FlexLayoutModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        AuthGuard,
        UserService,
        ConfirmService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
