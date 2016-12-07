import { Component, ElementRef, Input } from '@angular/core';
import { FlashMessagePositioning, FlashMessageInterface } from './flash-message';
import { FlashMessageService } from './flash-message.service';
import { findIndex } from 'lodash';

@Component({
  selector: 'flash-message',
  template: `
              <div class="flash-messages" [ngClass]="messagePositioning">
                <div *ngFor="let msg of flashMsg">
                  <div class="alert" *ngIf="msg.message" [ngClass]="msg.isSuccess ? 'alert-success' : msg.isError
                      ? 'alert-danger' : msg.isWarning ? 'alert-warning' : 'alert-info'" [id]="msg.uuid">
                      <i (click)="destroy(msg.uuid)" class="fa fa-close" aria-hidden="true"></i>
                      <div>
                          <p>{{msg.message}}</p>
                      </div>
                  </div>
                </div>
               </div>
            `,
  styles: [`
            .top-right {
              position: fixed;
              top: 75px;
              right: 29px;
              z-index: 1030;
            }
            
            .alert {
              min-width: 300px;
              max-width: 350px;
              min-height: 70px;
              max-height: 100px;
            }
            
            .alert > div {
              padding: 7px;
            }
            
            .alert i.fa-close {
              position: absolute;
              right: 8px;
              top: auto;
              margin-top: 2px;
            }
            
            .alert i.fa-close:hover {
              cursor: pointer;
            }
           `],
})

export class FlashMessagesComponent {

  @Input('messagePositioning') private messagePositioning: FlashMessagePositioning;

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