import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  weatherData: any;
  isDay: boolean = true;
  weatherType: string;
  weatherTypeDescription: string;
  temperature: number;
  feelsLikeTemperature: number;
  humidity: number;
  sunrise: string;
  sunset: string;
  today: string;
  tomorrowTemperature: number;

  constructor() {}

  ngOnInit(): void {
    this.getWeatherData();
    this.displayTodaysDate();
    this.setIsDay();
  }

  /* _________________________ Daily weather __________________________ */

  getWeatherData() {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=lyon&appid=b6aab60ab28ca4dab2c888b1d6537e0e&units=metric&lang=fr'
    )
      .then((response) => response.json())
      .then((data) => {
        this.setWeatherData(data);
      });
  }

  setWeatherData(data) {
    this.weatherData = data;
    //console.log(data);
    this.weatherType = this.weatherData.weather[0].main;
    //('type de météo', this.weatherType);
    this.weatherTypeDescription = this.weatherData.weather[0].description;
    this.temperature = this.weatherData.main.temp.toFixed(1);
    //console.log(this.temperature);
    this.feelsLikeTemperature = this.weatherData.main.feels_like.toFixed(1);
    this.humidity = this.weatherData.main.humidity;
  }

  setIsDay() {
    const hours = new Date().getHours();
    this.isDay = hours > 6 && hours < 21;
    //console.log(this.isDay);
  }

  // Formatage de la date
  displayTodaysDate() {
    let options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    let date = new Date();
    //@ts-ignore
    this.today = date.toLocaleDateString(undefined, options).toUpperCase();
    //console.log('Date du jour : ', this.today);
  }
}
