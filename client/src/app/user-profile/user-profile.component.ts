import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    userDetails: User;

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        this.userService.getUserProfile().subscribe(res => {
            this.userDetails = res['user'];
        }, error => {
            
        })
    }

    onLogoutEvent() {
        this.userService.deleteToken();
        this.router.navigate(['/login']);
    }

}
