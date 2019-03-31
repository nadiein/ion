import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'edit-user-profile',
    templateUrl: './edit.user.profile.component.html',
    styleUrls: ['./edit.user.profile.component.css']
})
export class EditUserProfileComponent implements OnInit {

    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    showSucessMessage: boolean;
    serverErrorMessages: string;

    constructor(private userService: UserService, private router: Router) {}

    ngOnInit() { }

    onSubmit(form: NgForm) {
        this.userService.updateUserProfile(form.value).subscribe(res => {
            console.log(res)
            this.router.navigateByUrl('/userProfile');
        }, error => {
            this.serverErrorMessages = error.error.message;
        });
    }

    resetForm(form: NgForm) {
        this.userService.selectedUser = {
            fullName: "",
            email: "",
            password: ""
        };
        form.resetForm();
        this.serverErrorMessages = "";
    }

}
