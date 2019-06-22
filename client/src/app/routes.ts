import { CreateArticleComponent } from './create-article/create.article.component';
import { EditUserProfileComponent } from './edit-user-profile/edit.user.profile.component';
import { AuthGuard } from './auth/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LogInComponent } from './user/log-in/log-in.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ArticlesComponent } from './articles/articles.component';

export const AppRoutes: Routes = [
    {
        path: 'signup',
        component: UserComponent,
        children: [{ path: '', component: SignUpComponent }],
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: UserComponent,
        children: [{ path: '', component: LogInComponent }]
    },
    {
        path: 'login',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'users',
        component: UserProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users/edit',
        component: EditUserProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'articles/create',
        component: CreateArticleComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'articles',
        component: ArticlesComponent,
        canActivate: [AuthGuard]
    },
    // {
    //     path: '**',
    //     component: PagenotfoundComponent
    // }
];
