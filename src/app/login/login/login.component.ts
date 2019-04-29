import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  files : any;
  message : any;
  imagePath : any;
  imgURL : any;
  constructor(public shared: SharedService,public route:Router) { }

  ngOnInit() {
  }

  login(){
  }
   

  preview(event) {
    // this.files = files;
    var file = event.target.files[0];



    // var mimeType = files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   this.files = files.files;
    //   return;
    // }

    // var reader = new FileReader();
    // // this.imagePath = this.files;
    // reader.readAsDataURL(files[0]);
    // reader.onload = (_event) => {
    //   this.imgURL = reader.result;
    this.shared.getFile(file)
    this.route.navigateByUrl('/main');

  }
}

