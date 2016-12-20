import { Component, ElementRef, Input } from '@angular/core';
import { FlashMessagePositioning, FlashMessageInterface } from './flash-message';
import { FlashMessageService } from './flash-message.service';
import { findIndex } from 'lodash';
import { STYLES } from './styles';

@Component({
  selector: 'flash-message',
  template: `
              <div class="flash-messages" [ngClass]="messagePositioning">
                <div *ngFor="let msg of flashMsg">
                  <div class="alert" *ngIf="msg.message" [ngClass]="msg.isSuccess ? 'alert-success' : msg.isError
                      ? 'alert-danger' : msg.isWarning ? 'alert-warning' : 'alert-info'" [id]="msg.uuid">
                      <a class="close" (click)="destroy(msg.uuid)">x</a>
                      <div>
                          <p>{{msg.message}}</p>
                      </div>
                  </div>
                </div>
               </div>
            `,
  styles: [
    STYLES
  ],
})

export class FlashMessagesComponent {

  @Input('messagePositioning') private messagePositioning: FlashMessagePositioning = 'top-right';

  private flashMsg: Array<FlashMessageInterface>;

  private readonly DEFAULT_TIMEOUT = 6000;

  constructor(private flashMsgService: FlashMessageService,
              private el: ElementRef) {
    this.flashMsg = [];

    this.flashMsgService._flashMessage.subscribe(
      (flashMsg: FlashMessageInterface) => {
        this.show(flashMsg);
      }
    );
  }

  private show(flashMsg: FlashMessageInterface) {
    if (! flashMsg) {
      return;
    }

    this.flashMsg.unshift(flashMsg);

    setTimeout(
      () => {
          this.destroy(flashMsg.uuid);
        }, flashMsg.timeoutInMS ? flashMsg.timeoutInMS : this.DEFAULT_TIMEOUT
      )
  }

  private destroy(uuid) {
    let flashMessageToRemove = findIndex(this.flashMsg, [ 'uuid', uuid ]);
    if (flashMessageToRemove !== -1) {
      this.flashMsg.splice(flashMessageToRemove, 1);
    }
  }

}
