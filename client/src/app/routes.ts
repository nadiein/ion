import { EditUserProfileComponent } from './edit-user-profile/edit.user.profile.component';
import { AuthGuard } from './auth/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LogInComponent } from './user/log-in/log-in.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

export const appRoutes: Routes = [
    {
        path: 'signup',
        component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
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
        path: 'userProfile',
        component: UserProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'updateProfile',
        component: EditUserProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: PagenotfoundComponent
    }
];
