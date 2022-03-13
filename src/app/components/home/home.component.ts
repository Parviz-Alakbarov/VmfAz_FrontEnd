import { Component, OnInit } from '@angular/core';
import { Slider } from 'src/app/models/entities/slider';
import { SliderService } from './../../services/slider.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


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


  bannerSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

}
