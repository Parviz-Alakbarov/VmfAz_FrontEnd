import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  stringData:string;
  numericData:number;
  constructor() { }

  getNumericData():number{
    return this.numericData;
  }

  setNumericData(number:number){
    this.numericData = number;
  }

  getStringData():string{
    return this.stringData;
  }

  setStringData(data:string){
    this.stringData = data;
  }
}
