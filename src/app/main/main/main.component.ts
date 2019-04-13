import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import { generate } from 'rxjs';

import {
  animate, state, style, transition, trigger
} from '@angular/animations';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('slide', [
      state('right', style({ 
        transform: 'translateX(-103%)',
        
     })),
     state('left',style({
       transform: 'translateX(0%)'
     })),
      transition('* => *', animate(300))
    ])
  ]

})

export class MainComponent implements OnInit {
  public imagePath;
  imgURL: any;
  response: any;
  public message: string;
  files: any;
  isRightVisible: any;
  flagOriginal= false;
  selectedId: number;
  constructor(public route: ActivatedRoute,public service: MainService) { }

  ngOnInit() {
  this.imgURL = "text.jpg";
  this.files = this.route.snapshot.paramMap.get('file');
  console.log(this.files)
  }
  switch(a) {
    var id1 = "n" + a;
    var id2 = "s" + a;
    if (a == 1) {
      document.getElementById("n2").classList.remove("is-active")
      document.getElementById("n1").classList.add("is-active")
      if(this.flagOriginal === true){
        document.getElementById("s2").style.display = "none";
        document.getElementById("tab1").style.display = "block";
        document.getElementById("s3").style.display = "block";    
        this.isRightVisible = false;        
      }


    }
    else if (a == 2) {
      document.getElementById("n1").classList.remove("is-active")
      document.getElementById("n2").classList.add("is-active")
      if(this.flagOriginal === true ){
        document.getElementById("tab1").style.display = "none";
        document.getElementById("s2").style.display = "block";
        document.getElementById("s3").style.display = "block";    

      }  

    }

  }

  // preview(files) {
  //   if(this.flagOriginal){
  //     this.isRightVisible = false;
  //     document.getElementById("n1").classList.add('is-half') ;
  //     document.getElementById("n1").classList.remove('is-one-quarter') ;
  //     document.getElementById("n2").classList.add('is-half') ;
  //     document.getElementById("n2").classList.remove('is-one-quarter') ;
  //     document.getElementById("s2").style.display = "block";
  //     document.getElementById("n3").style.display = "none";
  //     document.getElementById("s3").style.display = "none";    

  //   }
  //   this.flagOriginal =  false;
  //   document.getElementById("c1").style.display = "none";

  //   this.files = files[0];
  //   if (files.length === 0)
  //     return;

  //   var mimeType = files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.message = "Only images are supported.";
  //     return;
  //   }

  //   var reader = new FileReader();
  //   this.imagePath = files;
  //   reader.readAsDataURL(files[0]);
  //   reader.onload = (_event) => {
  //     this.imgURL = reader.result;
  //   }
  //   document.getElementById("file-name").innerHTML = files[0].name;
  //   document.getElementById("file").classList.add("is-uploaded");
  //   document.getElementById("file").classList.remove("is-boxed");
  //   document.getElementById("b1").style.display = "block";

  // }


  generate_master_copy() {
    console.log("hello")
    document.getElementById("b1").style.display = "none";
    document.getElementById("progress").style.display = "block";
    document.getElementById("text").style.display = "block";

    this.service.get_master_copy(this.files).subscribe(resp => {
      console.log("hello")
      console.log(resp)
      this.response = resp;
      (document.getElementById('i1') as HTMLIFrameElement).srcdoc = resp['html'];
      (document.getElementById('i1') as HTMLIFrameElement).width = resp['width'] + 'px';
      console.log((document.getElementById('i1') as HTMLIFrameElement).width)
      // document.getElementById('i1').height = "1000px";
      document.getElementById('i1').innerHTML = resp['html'];
      document.getElementById('i1').style.width = resp['width'];
      document.getElementById("progress").style.display = "none";
      document.getElementById("text").style.display = "none";
      document.getElementById("b2").style.display = "block";
      document.getElementById("c1").style.display = "block";
      document.getElementById("i1").style.display = "block";

    })
  }

  generate_braille(){
    console.log("inside generate_braille")
    this.flagOriginal = true;
    this.isRightVisible = true;
    document.getElementById("b2").style.display = "none";
    document.getElementById("n1").classList.remove('is-half') ;
    document.getElementById("n1").classList.add('is-one-quarter') ;
    document.getElementById("n1").classList.remove('is-active') ;
    document.getElementById("original").innerHTML = "Original" ;

 
    document.getElementById("n2").classList.remove('is-half') ;
    document.getElementById("n2").classList.add('is-one-quarter') ;
    document.getElementById("n2").classList.add('is-active') ;

    document.getElementById("n3").style.display = "block";
    document.getElementById("s3").style.display = "block";
    document.getElementById("progress1").style.display = "block";
    document.getElementById("text1").style.display = "block";




  }

}




