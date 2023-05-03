import {Component, OnInit} from '@angular/core';
import {ICurrentWeather} from "../interfaces/ICurrentWeather";
import {WeatherService} from "../services/weather.service";

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather | undefined;

  constructor(private weatherService: WeatherService) {

  }

  ngOnInit(): void {
    this.weatherService.getCurrentWeather('sydney', 'AU').subscribe((data => this.current = data));
  }

}
