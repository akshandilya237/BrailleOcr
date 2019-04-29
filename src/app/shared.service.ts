import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  file : any;

  getFile(file: any){
   this.file=file;
  }

}
