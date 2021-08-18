import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  weatherForecast: any;
  dailyTemperatures: Array<Object>;
  today: Date;
  tomorrow: any;
  minimumTemperature: number;
  maximumTemperature: number;
  weatherType: string;

  constructor() {}

  ngOnInit(): void {
    this.getWeatherForecast();
  }

  getWeatherForecast() {
    fetch(
      '  https://api.openweathermap.org/data/2.5/onecall?lat=45.75&lon=4.85&exclude=current,minutely,hourly&appid=b6aab60ab28ca4dab2c888b1d6537e0e&units=metric'
    )
      .then((response) => response.json())
      .then((data) => {
        this.setWeatherForecast(data);
      });
  }

  setTomorrowDate(param: number) {
    this.today = new Date();
    this.today.setDate(this.today.getDate() + param);
    let options = {
      month: 'numeric',
      day: 'numeric',
    };
    //@ts-ignore
    this.tomorrow = this.today.toLocaleDateString(undefined, options);
    return this.tomorrow;
  }

  getMinimumTemperature(day: number) {
    this.minimumTemperature =
      this.weatherForecast.daily[day].temp.min.toFixed(1);
    return this.minimumTemperature;
  }

  getMaximumTemperature(day: number) {
    this.maximumTemperature =
      this.weatherForecast.daily[day].temp.max.toFixed(1);
    return this.maximumTemperature;
  }

  getWeatherType(day: number) {
    this.weatherType = this.weatherForecast.daily[day].weather[0].main;
    return this.weatherType;
  }

  setWeatherForecast(data) {
    this.weatherForecast = data;
    console.log(this.weatherForecast);
    this.dailyTemperatures = [
      {
        day: 0,
        date: this.setTomorrowDate(1),
        min_temp: this.getMinimumTemperature(0),
        max_temp: this.getMaximumTemperature(0),
        weather_type: this.getWeatherType(0),
      },
      {
        day: 1,
        date: this.setTomorrowDate(2),
        min_temp: this.getMinimumTemperature(1),
        max_temp: this.getMaximumTemperature(1),
        weather_type: this.getWeatherType(1),
      },
      {
        day: 2,
        date: this.setTomorrowDate(3),
        min_temp: this.getMinimumTemperature(2),
        max_temp: this.getMaximumTemperature(2),
        weather_type: this.getWeatherType(2),
      },
    ];
  }
}
