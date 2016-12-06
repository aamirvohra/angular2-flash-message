import { Component, ElementRef, Input } from '@angular/core';
import { FlashMessagePositioning, FlashMessageInterface } from './flash-message';
import { FlashMessageService } from './flash-message.service';
import { findIndex } from 'lodash';

@Component({
  selector: 'flash-message',
  template: require('./flash-message.component.html'),
  styles: [require('./flash-message.component.scss')],
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
