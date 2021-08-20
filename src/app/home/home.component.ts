import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  weatherData: any;
  isDay: boolean;
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
    this.displaySunriseTime();
    this.displaySunsetTime();
    this.getIsDay();
  }

  // Checker quelle période du jour (jour nuit) on est
  getIsDay() {
    let sunset = new Date(this.weatherData.sys.sunset * 1000);
    //console.log(sunset);
    let sunrise = new Date(this.weatherData.sys.sunrise * 1000);
    //console.log(sunrise);
    let today = new Date();
    //console.log(today);

    if (today >= sunrise && today <= sunset) {
      this.isDay = true;
      //console.log(this.isDay);
    } else {
      this.isDay = false;
    }

    /* si cela ne marche pas ou si besoin de simplifier, version "à la main" sans récupérer les données locales. Juste définir ce que l'on considère comme faisant partie du jour et comme faisant partie de la nuit. 
    let hours = new Date().getHours(); 
    this.isDay = hours > 6 && hours < 20; */
  }

  // Afficher correctement l'heure de lever / coucher du soleil
  displaySunriseTime() {
    let sunriseDate = new Date(this.weatherData.sys.sunrise * 1000);
    // toLocaleTimeString fait un formatage joli. On peut lui passer des options pour l'affichage. Ici pas de secondes.
    this.sunrise = sunriseDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    //console.log(this.sunrise);
  }

  displaySunsetTime() {
    let sunsetDate = new Date(this.weatherData.sys.sunset * 1000);
    this.sunset = sunsetDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    //console.log(this.sunset);
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
