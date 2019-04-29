import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import { DomSanitizer } from '@angular/platform-browser';
import { generate } from 'rxjs';
import { SharedService } from '../../shared.service';
import {
  animate, state, style, transition, trigger
} from '@angular/animations';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
declare global {
  interface Window { html2canvas: any; }
}
window.html2canvas = html2canvas

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('slide1', [
      state('right', style({
      })),
      transition('* => *', animate(300))
    ]),
    trigger('slide2', [
      state('right', style({

      })),
      transition('* => *', animate(300))
    ])
  ]

})

export class MainComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    console.log((document.getElementById('checkbox') as HTMLInputElement).checked);
    (document.getElementById('checkbox') as HTMLInputElement).checked = true;

    console.log((document.getElementById('checkbox') as HTMLInputElement).checked);
  }
  public imagePath;
  imageURL: any;
  response: any;
  message: any;
  files: any;
  isSlide1Visible: any;
  isSlide2Visible: any;
  brailleresponse: any;
  lang: any;
  flagOriginal = false;
  selectedId: number;
  imageUrl: string | ArrayBuffer;
  constructor(private sanitizer: DomSanitizer, public shared: SharedService, public route: ActivatedRoute, public service: MainService) { }

  ngOnInit() {
    this.files = this.shared.file;
    if (this.files.type === 'application/pdf') {
      var reader = new FileReader();
      reader.readAsArrayBuffer(this.files);
      reader.onload = (_event) => {
        let blob = reader.result;
        this.message = blob;
        let file = new Blob([blob], { type: 'application/pdf' });
        this.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));

      }


    }
    else if (this.files.type.match(/image\/*/)) {
      var reader = new FileReader();
      reader.readAsArrayBuffer(this.files)
      reader.onload = (_event) => {
        let blob = reader.result;
        this.message = blob;
        let file = new Blob([blob], { type: this.files.type });
        this.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));
      }
    }


  }
  switch(a) {
    var id1 = "n" + a;
    var id2 = "s" + a;
    if (a == 1) {
      document.getElementById("n2").classList.remove("is-active")
      document.getElementById("n1").classList.add("is-active")
      document.getElementById("s2").style.display = "none";
      document.getElementById("tab1").style.display = "block";
      document.getElementById("s3").style.display = "block";


    }
    else if (a == 2) {
      document.getElementById("n1").classList.remove("is-active")
      document.getElementById("n2").classList.add("is-active")
      document.getElementById("tab1").style.display = "none";
      document.getElementById("s2").style.display = "block";
      document.getElementById("s3").style.display = "block";

    }

  }




  generate_master_copy() {
    console.log("hello")
    document.getElementById("master-copy-form").style.display = "none";
    document.getElementById("progress").style.display = "block";
    document.getElementById("text").style.display = "block";
    var selectedlang = document.getElementById("select_lang") as HTMLSelectElement;
    this.lang = selectedlang.options[selectedlang.selectedIndex].value
    var checkedboxval = document.getElementById('checkbox') as HTMLInputElement;
    this.service.get_master_copy(this.files, this.lang, checkedboxval.checked).subscribe(resp => {
      this.response = resp;
      console.log(resp)
      document.getElementById("progress").style.display = "none";
      document.getElementById("text").style.display = "none";
      document.getElementById("b2").style.display = "block";
      document.getElementById("b3").style.display = "block";
      document.getElementById("c1").style.display = "block";
      var html = '';
      for (var i = 0; i < this.response.length; i++) {
        html += '<iframe scrolling="yes" id="p' + i + '"></iframe>'

      }
      document.getElementById("c1").innerHTML = html;

      for (var i = 0; i < this.response.length; i++) {
        var iframe = document.getElementById('p' + i) as HTMLIFrameElement;
        var content = this.response[i].html;
        var frameDoc = iframe.contentDocument;
        if (iframe.contentWindow)
          frameDoc = iframe.contentWindow.document;

        frameDoc.open();
        frameDoc.writeln(content);
        frameDoc.close();
        (document.getElementById('p' + i) as HTMLIFrameElement).style.width = '-webkit-fill-available';
        (document.getElementById('p' + i) as HTMLIFrameElement).style.height = this.response[i].height + 20 + 'px';


      }

    })

  }


  generate_braille() {
    console.log("inside generate_braille")
    var masterEditable = []
    for (var i = 0; i < this.response.length; i++) {
      var iframe = document.getElementById('p' + i) as HTMLIFrameElement;
      masterEditable[i] = iframe.contentWindow.document.documentElement.innerHTML;
    }
    this.flagOriginal = true;
    this.isSlide1Visible = true;
    this.isSlide2Visible = true;
    document.getElementById("b3").style.display = "none";
    document.getElementById("b2").style.display = "none";
    document.getElementById("n1").classList.remove('is-half');
    document.getElementById("n1").classList.add('is-one-quarter');
    document.getElementById("n1").classList.remove('is-active');

    document.getElementById("tab1").style.display = "none";
    document.getElementById("s2").style.display = "block";
    document.getElementById("s2").style.height = "92vh";

    document.getElementById("n2").classList.remove('is-half');
    document.getElementById("n2").classList.add('is-one-quarter');
    document.getElementById("s3").style.display = "block";
    document.getElementById("progress1").style.display = "block";
    document.getElementById("text1").style.display = "block";
    document.getElementById("n2").classList.add('is-active');

    document.getElementById("n3").style.display = "block";

    this.service.get_braille(masterEditable, this.lang).subscribe(resp => {
      document.getElementById("progress1").style.display = "none";
      document.getElementById("text1").style.display = "none";
      document.getElementById("c2").style.display = "block";
      document.getElementById("b4").style.display = "block";

      console.log(resp)
      this.brailleresponse = resp;

      var html = '';
      for (var i = 0; i < this.response.length; i++) {
        html += '<iframe scrolling="yes" id="k' + i + '"></iframe>'

      }
      document.getElementById("c2").innerHTML = html;

      for (var i = 0; i < this.response.length; i++) {
        var iframe = document.getElementById('k' + i) as HTMLIFrameElement;
        var content = this.brailleresponse[i];
        var frameDoc = iframe.contentDocument;
        console.log(content)
        if (iframe.contentWindow)
          frameDoc = iframe.contentWindow.document;

        frameDoc.open();
        frameDoc.writeln(content);
        console.log(frameDoc)
        frameDoc.close();
        (document.getElementById('k' + i) as HTMLIFrameElement).style.width = '-webkit-fill-available';
        (document.getElementById('k' + i) as HTMLIFrameElement).style.height = this.response[i].height + 20 + 'px';
      }
    })

  }

  print_braille() {
    var doc = '';
    for (var i = 0; i < this.response.length; i++) {
      var iframe = document.getElementById('k' + i) as HTMLIFrameElement;
      var htmldata = iframe.contentWindow.document.documentElement.outerHTML.replace(/'/gi, "&#039;")
      doc += '<iframe style="height:' + this.response[i].height + 'px;width:' + this.response[i].width + 'px;" frameBorder="0" srcdoc=\'' + htmldata + '\'></iframe><br>';
    }
    console.log(doc);
    var newIframe = document.createElement('iframe');
    newIframe.width = '2500';
    newIframe.height = '3700';
    newIframe.srcdoc = doc;
    newIframe.name = 'printf';
    newIframe.id = 'printf';
    newIframe.frameBorder = '0';
    newIframe.onload = function () {
      win.focus();
      win.print();
      win.close();
    };

    var win = window.open('height=3700,width=2500');
    win.document.body.appendChild(newIframe);
  }

  save_master_copy() {
    var doc = '';
    for (var i = 0; i < this.response.length; i++) {
      var iframe = document.getElementById('p' + i) as HTMLIFrameElement;
      var htmldata = iframe.contentWindow.document.documentElement.outerHTML.replace(/'/gi, "&#039;")
      doc += '<iframe style="height:' + this.response[i].height + 'px;width:' + this.response[i].width + 'px;" frameBorder="0" srcdoc=\'' + htmldata + '\'></iframe><br>';
    }

    this.service.save_master_copy(doc).subscribe(resp => {
      const blob = new Blob([resp], { type: 'application/pdf' });
      const url= window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";    
      a.href = url;
      a.download = "filename.pdf"
      a.click();
      window.URL.revokeObjectURL(url);

    })     


    
}}