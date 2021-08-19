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

  constructor() {}

  ngOnInit(): void {
    this.getWeatherForecast();
  }

  getWeatherForecast() {
    fetch(
      '  https://api.openweathermap.org/data/2.5/onecall?lat=45.75&lon=4.85&exclude=current,minutely,hourly&appid=b6aab60ab28ca4dab2c888b1d6537e0e&units=metric&lang=fr'
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
      day: 'numeric',
      weekday: 'short',
    };
    //@ts-ignore
    this.tomorrow = this.today.toLocaleDateString(undefined, options);
    return this.tomorrow;
  }

  getMinimumTemperature(day: number) {
    return this.weatherForecast.daily[day].temp.min.toFixed(1);
  }

  getMaximumTemperature(day: number) {
    return this.weatherForecast.daily[day].temp.max.toFixed(1);
  }

  getWeatherType(day: number) {
    return this.weatherForecast.daily[day].weather[0].main;
  }

  setWeatherForecast(data) {
    this.weatherForecast = data;
    //console.log(this.weatherForecast);
    this.dailyTemperatures = [
      {
        day: 1,
        date: this.setTomorrowDate(1),
        min_temp: this.getMinimumTemperature(0),
        max_temp: this.getMaximumTemperature(0),
        weather_type: this.getWeatherType(0),
      },
      {
        day: 2,
        date: this.setTomorrowDate(2),
        min_temp: this.getMinimumTemperature(1),
        max_temp: this.getMaximumTemperature(1),
        weather_type: this.getWeatherType(1),
      },
      {
        day: 3,
        date: this.setTomorrowDate(3),
        min_temp: this.getMinimumTemperature(2),
        max_temp: this.getMaximumTemperature(2),
        weather_type: this.getWeatherType(2),
      },
      {
        day: 4,
        date: this.setTomorrowDate(4),
        min_temp: this.getMinimumTemperature(3),
        max_temp: this.getMaximumTemperature(3),
        weather_type: this.getWeatherType(3),
      },
      {
        day: 5,
        date: this.setTomorrowDate(5),
        min_temp: this.getMinimumTemperature(4),
        max_temp: this.getMaximumTemperature(4),
        weather_type: this.getWeatherType(4),
      },
      {
        day: 6,
        date: this.setTomorrowDate(6),
        min_temp: this.getMinimumTemperature(5),
        max_temp: this.getMaximumTemperature(5),
        weather_type: this.getWeatherType(5),
      },
      {
        day: 7,
        date: this.setTomorrowDate(7),
        min_temp: this.getMinimumTemperature(6),
        max_temp: this.getMaximumTemperature(6),
        weather_type: this.getWeatherType(6),
      },
      {
        day: 8,
        date: this.setTomorrowDate(8),
        min_temp: this.getMinimumTemperature(7),
        max_temp: this.getMaximumTemperature(7),
        weather_type: this.getWeatherType(7),
      },
    ];
  }
}
