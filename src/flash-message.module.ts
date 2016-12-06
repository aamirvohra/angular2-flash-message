import { NgModule } from '@angular/core';
import { FlashMessageService } from './flash-message.service';
import { FlashMessagesComponent } from './flash-message.component';

@NgModule({
  declarations: [
    FlashMessagesComponent,
  ],

  exports: [
    FlashMessagesComponent,
  ],
  providers: [
    FlashMessageService,
  ]
})

export class FlashMessageModule {}