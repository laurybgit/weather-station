import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  weatherForecast: any;
  today: Date;
  dailyTemperatures: Array<Object>;
  constructor() {
    this.today = new Date();
  }

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

  getTomorrow() {}

  setWeatherForecast(data) {
    this.weatherForecast = data;
    console.log(this.weatherForecast);
    this.dailyTemperatures = [
      {
        day: 1,
        date: 'date',
        temp_min: 'loulou',
        temp_max: 'coucou',
        weather_type: 'lalala',
      },
      {
        temp_min: 'hello',
      },
    ];
  }
}
