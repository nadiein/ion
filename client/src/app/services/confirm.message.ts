export class ConfirmMessage {
    constructor(
        public title:string,
        public text:string,
        public type:ConfirmType,
        public buttons:ConfirmButton[]) {}
}

export enum ConfirmType {
    Info, Warning, Error
}

export class ConfirmButton {
    constructor(
        public label:string,
        public handler:Function=null) {}
}

export let ConfirmButtonOK: ConfirmButton = new ConfirmButton("OK", null);