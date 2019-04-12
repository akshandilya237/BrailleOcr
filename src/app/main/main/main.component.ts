import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { generate } from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public imagePath;
  imgURL: any;
  response: any;
  public message: string; 
  files: any; 
  constructor(public service: MainService) { }

  ngOnInit() {

    
  }

  switch(a){
   var id1 = "n"+a;
   var id2 = "s"+a;
  if(a==1){
    document.getElementById("n2").classList.remove("is-active")
    document.getElementById("n3").classList.remove("is-active")
    document.getElementById("n1").classList.add("is-active")
  
  }
  else if(a==2){
    document.getElementById("n1").classList.remove("is-active")
    document.getElementById("n3").classList.remove("is-active")
    document.getElementById("n2").classList.add("is-active")
  }
  else if(a==3){
    document.getElementById("n1").classList.remove("is-active")
    document.getElementById("n2").classList.remove("is-active")
    document.getElementById("n3").classList.add("is-active")
  }




  }

  preview(files) {
    this.files = files[0];
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    document.getElementById("file-name").innerHTML = files[0].name;
    document.getElementById("file").classList.add("is-uploaded");
    document.getElementById("file").classList.remove("is-boxed");
    document.getElementById("b1").style.display = "block";

  }


  generate_master_copy(){
          console.log("hello")
    document.getElementById("b1").style.display = "none";
    document.getElementById("progress").style.display = "block";
    document.getElementById("text").style.display = "block";

    this.service.get_master_copy(this.files).subscribe(resp =>{
      console.log("hello")
      console.log(resp)
      this.response = resp;
      (document.getElementById('i1') as HTMLIFrameElement).srcdoc = resp['html'];
      (document.getElementById('i1') as HTMLIFrameElement).width = resp['width']+'px';
      console.log((document.getElementById('i1') as HTMLIFrameElement).width)
      // document.getElementById('i1').height = "1000px";
      document.getElementById('i1').innerHTML = resp['html'];
      document.getElementById('i1').style.width = resp['width'];
      document.getElementById("progress").style.display = "none";
      document.getElementById("text").style.display = "none";
      document.getElementById("b2").style.display = "block";
      document.getElementById("c1").style.display = "block";
      document.getElementById("i1").style.display = "block";





    }  
      )}

    
  
  }

 


