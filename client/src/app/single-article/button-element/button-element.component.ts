import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'button-element',
    templateUrl: './button-element.component.html',
    styleUrls: ['./button-element.component.css']
})
export class ButtonElementComponent implements OnInit {

    @Input() button: ButtonVo;

    @Output() buttonEvent: EventEmitter<ButtonVo> = new EventEmitter;

    constructor() { }

    ngOnInit() { }

    onButtonClickEvent(button:ButtonVo) {
        console.log('type => ', button)
        this.buttonEvent.emit(button);
    }

}

export enum ButtonKind {
    Save, Edit, Cancel, Delete
}

export enum ButtonColor {
    Primary = 'Primary',
    Success = 'Success',
    Warn = 'Warn',
    Danger = 'Danger'
}

export class ButtonVo {
    constructor(
        public kind: ButtonKind,
        public label: string,
        public visibility: boolean,
        public color: ButtonColor
    ) { }
}
