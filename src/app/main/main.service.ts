import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  // baseurl = "http://localhost:5000"
  baseurl = "http://ea1c8f0f.ngrok.io"
  constructor(public http:HttpClient) { }

  get_master_copy(files){
    const formData: FormData = new FormData();
    formData.append('file', files);
    console.log(formData)
    return this.http.post(this.baseurl+'/get_master_copy',formData)
  }
}
