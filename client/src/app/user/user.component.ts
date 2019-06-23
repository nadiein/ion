import { Component } from "@angular/core";
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.css"]
})
export class UserComponent {

    faLongArrowAltLeft = faLongArrowAltLeft;

    constructor() { }
}
