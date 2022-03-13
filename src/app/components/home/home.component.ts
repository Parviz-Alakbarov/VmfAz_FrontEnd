import { Component, OnInit } from '@angular/core';
import { Slider } from 'src/app/models/entities/slider';
import { SliderService } from './../../services/slider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sliders:Slider[]=[];


  constructor(private sliderService:SliderService) { }

  ngOnInit(): void {
    this.getSliders();
  }

  getSliders(){
    this.sliderService.getSliders().subscribe(response=>{
      this.sliders = response.data;
    })
  }

}
