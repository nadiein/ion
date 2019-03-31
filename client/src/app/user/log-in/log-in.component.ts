import { UserService } from "./../../shared/user.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "app-log-in",
    templateUrl: "./log-in.component.html",
    styleUrls: ["./log-in.component.css"]
})
export class LogInComponent implements OnInit {

    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    showSucessMessage: boolean;
    serverErrorMessages: string;

    constructor(private userService: UserService, private router: Router) {}

    ngOnInit() {
        if (this.userService.isLoggedIn()) {
            this.router.navigateByUrl('/userProfile');
        }
    }

    onSubmit(form: NgForm) {
        this.userService.auth(form.value).subscribe(res => {
            this.userService.setToken(res['token']);
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
