import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../shared/user.model';

@Component({
    selector: 'edit-user-profile',
    templateUrl: './edit.user.profile.component.html',
    styleUrls: ['./edit.user.profile.component.css']
})
export class EditUserProfileComponent implements OnInit {

    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    showSucessMessage: boolean;
    serverErrorMessages: string;
    userId: string;

    constructor(public userService: UserService, private router: Router) {}

    ngOnInit() {
        if (this.userService.isLoggedIn()) {
            this.userId = this.userService.getUserPayload()._id;
        }
    }

    onSubmit(form: NgForm) {
        let userUpdate = Object.assign({}, form.value);
        userUpdate._id = this.userId;
        console.log('user update => ', userUpdate)
        this.userService.updateUserProfile(userUpdate).subscribe(res => {
            console.log(res)
            this.router.navigateByUrl('/users');
        }, error => {
            this.serverErrorMessages = error.error.message;
        });
    }

    resetForm(form: NgForm) {
        this.userService.selectedUser = {
            _id: null,
            fullName: '',
            email: '',
            password: ''
        };
        form.resetForm();
        this.serverErrorMessages = '';
    }

}
