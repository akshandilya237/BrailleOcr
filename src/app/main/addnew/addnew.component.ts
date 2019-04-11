import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.scss']
})
export class AddnewComponent implements OnInit {
  @Output() onClose = new EventEmitter();

  constructor() { }
  isVisible = false;
  ngOnInit() {

  }

  @Input('isVisible')
  set visible(flag:boolean){
  this.isVisible = flag;
  }

  hideModal(){
    //this.isVisible = false;
    this.onClose.emit(false);
  }



}
