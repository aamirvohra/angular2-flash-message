import { Component, OnInit } from '@angular/core';
import { FlashMessageService } from '../../../module/flash-message.service';
import { FlashMessage } from '../../../module/flash-message';


@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
  constructor(private flashMessageService: FlashMessageService){}

  public ngOnInit() {
    console.log('init');
    let fl = new FlashMessage();
    fl.message = 'Test';
    fl.isSuccess = true;
    fl.timeoutInMS = 80000;

    this.flashMessageService.display(fl);
  }
}
