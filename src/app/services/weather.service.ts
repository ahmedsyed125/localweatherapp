import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {ICurrentWeather} from "../interfaces/ICurrentWeather";

interface ICurrentWeatherData {
  weather: [{
    description: string,
    icon: string
  }],
  main: {
    temp: number
  },
  sys: {
    country: string
  },
  dt: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})


export class WeatherService {

  constructor(private http: HttpClient) {

  }

  getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
    const uriParams: HttpParams = new HttpParams()
      .set('q', `${city},${country}`)
      .set('appid', environment.appId);
    return this.http.get<ICurrentWeatherData>(environment.baseUrl, {params: uriParams}).pipe(
      map(data => this.getTransformedData(data)));
  }

  private getTransformedData(data: ICurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt.valueOf() * 1000,
      description: data.weather[0].description,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: data.main.temp - 273.15
    } as ICurrentWeather;
  }
}
