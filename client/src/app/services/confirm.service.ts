import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ConfirmMessage, ConfirmType, ConfirmButton } from "./confirm.message";

@Injectable()
export class ConfirmService {

    private subject = new Subject<ConfirmMessage>();

    getMessage(): Observable<ConfirmMessage> {
        return this.subject.asObservable();
    }

    info(msg:string, buttons:ConfirmButton[]=null) {
        this.showMessage(new ConfirmMessage('Info', msg, ConfirmType.Info, buttons));
    }

    warning(msg:string, buttons:ConfirmButton[]=null) {
        this.showMessage(new ConfirmMessage('Warning', msg, ConfirmType.Warning, buttons));
    }

    error(msg:string, buttons:ConfirmButton[]=null) {
        this.showMessage(new ConfirmMessage('Error', msg, ConfirmType.Error, buttons));
    }

    showMessage(message:ConfirmMessage) {
        this.subject.next(message);
    }

}
