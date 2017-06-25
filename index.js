const request = require('request');
const argv = require('yargs').argv;

let apiKey = '0f73c02d9449f127ea68dc0d7760fb5f';
let city = argv.c || 'council bluffs';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

let url2 = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    console.log('body:', body);
    let weather = JSON.parse(body);
    let message = `It's ${weather.main.temp} degrees in
               ${weather.name}!`;
    console.log(message);
    let wind_direction = toTextualDescription(weather.wind.deg);
    message = `Wind ${wind_direction} at ${weather.wind.speed} mph`;
    console.log(message);
    message = `Humidity ${weather.main.humidity}%`;
    console.log(message);
    let pressure = weather.main.pressure * 0.02961339710085;
    message = `Pressure ${pressure}`;
    console.log(message);
    message = `${weather.weather[0].description}`;
    console.log(message);
  }
});

request(url2, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    console.log('body:', body);
    let forecast = JSON.parse(body);
    let message = ` ${forecast.list.length} `;
    for (var i = 0; i < `${forecast.list.length}`; i=i+1){
      var date = new Date(`${forecast.list[i].dt}` * 1000);
      var display_date = date.toLocaleDateString()+" "+date.toLocaleTimeString();
      var timestr = date.toLocaleTimeString();
      //console.log(date, timestr);


      //console.log(`${forecast.list[i].dt}`);
      //var date = new Date(`${forecast.list[i].dt}`);
      //console.log(convertUTCDateToLocalDate(`${forecast.list[i].dt}`));
      console.log(`Date ${display_date} high: ${forecast.list[i].main.temp_max}  low: ${forecast.list[i].main.temp_min}  forecast ${forecast.list[i].weather[0].description} `);

    }

    console.log(message);

  }
});

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
}

function  toTextualDescription(degree){
    if (degree>337.5) return 'N';
    if (degree>292.5) return 'NW';
    if(degree>247.5) return 'W';
    if(degree>202.5) return 'SW';
    if(degree>157.5) return 'S';
    if(degree>122.5) return 'SE';
    if(degree>67.5) return 'E';
    if(degree>22.5){return 'NE';}
    return 'Northerly';
}
