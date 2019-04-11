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

    this.service.get_master_copy().subscribe(resp =>{
      console.log("hello")
      console.log(resp)
      this.response = resp;
      (document.getElementById('i1') as HTMLIFrameElement).srcdoc = resp['html'];
      (document.getElementById('i1') as HTMLIFrameElement).width = resp['width'];
      // document.getElementById('i1').height = "1000px";
      alert('Master Copy generated')


    }  
      )}

    
  
  }

 


