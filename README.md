forecast.io JSONP API Wrapper
================================
A simple JavaScript Wrapper for the Forecast.io API using JSONP (without any PHP-based proxies). Based on APIv2.

## Quick Outline
Provided in /src/main.js is the main fetching function, along with two examples which can (with modification) show either current weather or a forecast of the coming week. The purpose of fetching the information in a separate function is to create a sort of 'cache' so you don't have to constantly grab the data from forecast.io. Outlined below you can see that every 15 minutes the fetch function will grab the latest weather.

```JavaScript
function fetchWeather() {
	$.ajax({
		url: FORECAST_URL + FORECAST_API + '/' + latitude + ',' + longitude + "?units=auto",
		dataType: "jsonp",
		success: function (data) { weatherData = data;	/* Store our newly acquired weather data */ }
	});

	// Update the fetch time
	weatherUpdated = moment().unix().valueOf();

	// Fetch the weather every fifteen minutes
	setTimeout(function() { fetchWeather();  }, 900000);
}
```

## Motivation
Without having to use a PHP-proxy file to connect to a remote JSON source, Forecast.io provides a method to collect data in the form of JSONP. This is just a simple method for beginner users to grab and run with. It is by no means polished by any stretch of the imagination.

## Usage
Grab main.js and take the fetchWeather() function into your project. Use the other functions as examples in the file for ideas on how to integrate the Forecast.io API into your latest masterpiece.

## Forecast.io
Obvously, you'll need to create an account at https://developer.forecast.io/ and generate a unique API key.
Dark Sky have outdone themselves and also helped you out by providing all the documentation you need: https://developer.forecast.io/docs/v2.

## License
Licensed under the GNU General Public License.
Feel free to share, modify and play with it as you wish.
Forecast.io and the Forecast.io API is copyrighted by The Dark Sky Company, LCC. Ensure you stick within their terms and guidelines.

## Contact
Feel free to contact me if you are looking for some answers, or head over to Stack Overflow for general JavaScript questions. I'll help where and when I can.