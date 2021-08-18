import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // Daily weather
  weatherData: any;
  isDay: any = true;
  typeOfWeather: string;
  temperature: number;
  feelsLikeTemperature: number;
  humidity: number;

  // 7 days forecast
  weatherForecast: any;

  constructor() {}

  ngOnInit(): void {
    this.getWeatherData();
    this.getWeatherForecast();
  }

  // Daily weather
  getWeatherData() {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=lyon&appid=b6aab60ab28ca4dab2c888b1d6537e0e&units=metric'
    )
      .then((response) => response.json())
      .then((data) => {
        this.setWeatherData(data);
      });
  }

  setWeatherData(data) {
    this.weatherData = data;
    console.log(data);
    this.typeOfWeather = this.weatherData.weather[0].main;
    console.log(this.typeOfWeather);
    this.temperature = this.weatherData.main.temp.toFixed(1);
    console.log(this.temperature);
    this.feelsLikeTemperature = this.weatherData.main.feels_like.toFixed(1);
    this.humidity = this.weatherData.main.humidity;
  }

  // 7 days forecast
  getWeatherForecast() {
    fetch(
      '  https://api.openweathermap.org/data/2.5/onecall?lat=45.75&lon=4.85&exclude=current,minutely,hourly&appid=b6aab60ab28ca4dab2c888b1d6537e0e&units=metric'
    )
      .then((response) => response.json())
      .then((data) => {
        this.setWeatherForecast(data);
      });
  }

  setWeatherForecast(data) {
    this.weatherForecast = data;
    console.log(this.weatherForecast);
  }
}
