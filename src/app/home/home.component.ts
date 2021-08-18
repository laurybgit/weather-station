import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  weatherData: any;
  isDay: any = true;
  weatherType: string;
  temperature: number;
  feelsLikeTemperature: number;
  humidity: number;
  sunrise: string;
  sunset: string;
  today: string;
  weatherForecast: any;
  tomorrowTemperature: number;

  constructor() {}

  ngOnInit(): void {
    this.getWeatherData();
    this.displayTodaysDate();
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
    console.log(data);
    this.weatherType = this.weatherData.weather[0].description;
    console.log(this.weatherType);
    this.temperature = this.weatherData.main.temp.toFixed(1);
    console.log(this.temperature);
    this.feelsLikeTemperature = this.weatherData.main.feels_like.toFixed(1);
    this.humidity = this.weatherData.main.humidity;
    this.getSunriseTime();
    this.getSunsetTime();
  }

  // Afficher correctement l'heure de lever / coucher du soleil
  getSunriseTime() {
    // Pourquoi new date ? Pas compris mais ok ! Le *1000 ramène à la bonne base.
    let sunriseNumber = new Date(this.weatherData.sys.sunrise * 1000);
    // toLocaleTimeString fait visiblement un formatage joli. On peut lui passer des options pour l'affichage. Ici pas de secondes.
    this.sunrise = sunriseNumber.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    console.log(this.sunrise);
  }

  getSunsetTime() {
    let sunsetNumber = new Date(this.weatherData.sys.sunset * 1000);
    this.sunset = sunsetNumber.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    console.log(this.sunset);
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
    console.log('Date du jour : ', this.today);
  }
}
