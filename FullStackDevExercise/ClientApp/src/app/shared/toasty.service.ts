import { Injectable } from '@angular/core';
import { MessageService, Message } from 'primeng/api';


import { Observable, Subject } from 'rxjs';

export const ToastySuccess = 'success';
export const ToastyError = 'error';
export const ToastyInfo = 'info';
export const ToastyWarn = 'warn';
export const ToastyDefaultDelay = 3000;
export const ToastyShowTopRight = 'top-right';
export const ToastyShowBottomRight = 'bottom-right';
export const ToastyShowCenter = 'center';
export const ToastyShowTopCenter = 'top-center';


@Injectable({
    providedIn: 'root'
})
export class ToastyService {

    constructor(public messageService: MessageService) {
        this.PositionChanges$ = this.positionChange.asObservable();
    }


    private itemsSource = new Subject<Array<string>>();
    itemsHandler = this.itemsSource.asObservable();

    private positionChange: Subject<string> = new Subject<string>();
    PositionChanges$: Observable<string> = new Observable<string>();


    setPosition(position: string) {
        this.positionChange.next(position);
    }


    infoTop(message: string, delay: number = ToastyDefaultDelay) {
        this.messageService.add(
            <Message>{
                severity: ToastyInfo,
                summary: message,
                life: delay,
                position: ToastyShowTopRight,
            }
        );
    }


    info(message: string, delay: number = ToastyDefaultDelay) {
        this.messageService.add(
            <Message>{
                severity: ToastyInfo,
                summary: message,
                life: delay,

            }
        );
    }

    error(message: string) {
        this.messageService.add(
            <Message>{
                severity: ToastyError,
                summary: message,
                detail: 'Do Little Vet'
            }
        );
    }

    success(message: string) {
        this.messageService.add(
            <Message>{
                severity: ToastySuccess,
                summary: message,
                detail: 'Do Little Vet'
            });
    }

    warning(message: string) {
        this.messageService.add(
            <Message>{
                severity: ToastyWarn,
                summary: message,
                detail: 'Do Little Vet'
            }
        );
    }

    setItems(message: string, status: string) {
        this.showBottomRight();
        this.messageService.add(
            <Message>{
                severity: status,
                summary: message,
                detail: 'Do Little Vet'
            });
    }

    private showBottomRight = () => {
        this.positionChange.next(ToastyShowBottomRight);
    }
}
