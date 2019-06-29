import { Component, OnInit } from "@angular/core";
import { ConfirmService } from "./confirm.service";
import { ConfirmMessage, ConfirmButton, ConfirmButtonOK } from "./confirm.message";

@Component({
    selector:'confirm',
    templateUrl:'./confirm.component.html',
    styleUrls:['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

    message:ConfirmMessage;

    get visible():boolean {
        return this.message && this.message.text != null;
    }

    get buttons():ConfirmButton[] {
        if (this.message && this.message.buttons) {
            return this.message.buttons;
        } else {
            return [ConfirmButtonOK];
        }
    }

    constructor(
        private ConfirmService:ConfirmService) 
    {}

    ngOnInit() {
        this.ConfirmService.getMessage().subscribe(message => {
            this.message = message;
        });
    }

    onButtonClick(btn:ConfirmButton) {
        if (btn.handler) {
            console.log('btn => ', btn)
            btn.handler();
        }
        this.close();
    }

    close() {
        this.message = null;
    }

}

