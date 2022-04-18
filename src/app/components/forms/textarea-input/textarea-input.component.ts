import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.scss']
})
export class TextareaInputComponent implements ControlValueAccessor {
 
  @Input() label: string;
  @Input() class: string;
  @Input() placeholder: string;
  @Input() autoComplete: string;
 
  constructor(@Self() public ngControl: NgControl) { 
    this.ngControl.valueAccessor = this;
  }
 
  writeValue(obj: any): void {
  }
 
  registerOnChange(fn: any): void {
  }
 
  registerOnTouched(fn: any): void {
  }
 

}
