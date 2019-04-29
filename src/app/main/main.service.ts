import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  // baseurl = "http://localhost:5001"
  baseurl = "http://f99c5106.ngrok.io"
  constructor(public http:HttpClient) { }
  result : any;
  get_master_copy(files,lang,displayImg){
    const formData: FormData = new FormData();
    formData.append('file', files);
    formData.append('lang',lang);
    formData.append('displayImg',displayImg);
    console.log(formData)
    return  this.http.post(this.baseurl+'/get_master_copy',formData);

    }

  get_braille(html,language){
    var body = {};
    body['lang'] = language;
    body['data'] =  html;
    console.log(body)
    return  this.http.post(this.baseurl+'/get_braille',body);
  }

  save_master_copy(doc){
    var html = {};
    html['html'] = doc;
    return this.http.post(this.baseurl+'/save_pdf',html,{ responseType: 'blob' })
  }



  }

