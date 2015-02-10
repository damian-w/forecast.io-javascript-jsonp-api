/**
 * @abstract JavaScript Wrapper for the Forecast.io API using JSONP (without any PHP-based proxies)
 * @link https://github.com/damian-w/forecast.io-javascript-jsonp-api
 * @author Damian Worsdell <damian.w@iinet.net.au>
 * @license GNU GENERAL PUBLIC LICENSE, Version 2, June 1991
 * @copyright Copyright (C) 2015, Damian Worsdell
 */

var weatherData;

/* Forecast.io API Variables (Weather Forecasting) */
var FORECAST_URL = 	"https://api.forecast.io/forecast/";
var FORECAST_API = 	"###";	// Your API Key
var latitude     =	"###";	// Your Latitude
var longitude    =	"###";	// Your Longitude

/* Function: Fetch Forecast.io weather forecast */
function fetchWeather() {
	$.ajax({
		url: FORECAST_URL + FORECAST_API + '/' + latitude + ',' + longitude + "?units=auto",
		dataType: "jsonp",
		success: function (data) { weatherData = data;	/* Store our newly aquired weather data */ }
	});
	
	// Fetch the weather every fifteen minutes
	setTimeout(function() { fetchWeather();  }, 900000);
}


/*
 * Below are some examples on how to use the data collected in weatherData
 * In my project I used the Skycon HTML5 SVG icon set made by Dark Sky themselves as it's tied into the Forecase.io API.
 *
 * Also, I've used Moment.js to handle my times. You might want to go check that out! :)
 */

// Quick Function: Round number to nearest whole number (optional decimal points)
function round(number, points) {
	return number.toFixed(points);
}


/* Current weather conditons
 *
 * This function is a quick example on how you can use the data we've collected in weatherData from fetchWeather().
 * Obvously it's not polished at all, and is totally only a guideline.
 *
 * Example:
 * <weather>
 *   <span class="conditions_current"></span>
 *   <infomation>
 *     <span class="temperature"></span>
 *     <span class="sunrise"></span>
 *     <span class="sunset"></span>
 *     <span class="wind"></span>
 *     <span class="precip_prob"></span>
 *     <span class="humidity"></span>
 *   </infomation>
 * </weather>
 *
 */
function currentWeather() {
	
	// Animated Skycon for current conditions
	skycons.set("weatherCurrent", weatherData.currently.icon);    // Skycon Icons by Dark Sky
	
	// Temperature
	$('.temp_current').update(round(weatherData.currently.temperature, 1) + '&deg;');

	// Daily summary
	$('.conditions_current').update(weatherData.hourly.summary);
	
	// Daily maximum & minimum temperature
	if (weatherData.flags.units === "us") {
		$('.temperature').update(round(weatherData.daily.data[0].temperatureMax) + '&deg;' + ' / ' + round(weatherData.daily.data[0].temperatureMin) + '&deg;');
	} else {
		$('.temperature').update(round(weatherData.daily.data[0].temperatureMax) + '&deg;' + ' / ' + round(weatherData.daily.data[0].temperatureMin) + '&deg;');
	}

	// Sunrise
	$('.sunrise').update(moment.unix(weatherData.daily.data[0].sunriseTime).format('h.mm a'));

	// Sunset
	$('.sunset').update(moment.unix(weatherData.daily.data[0].sunsetTime).format('h.mm a'));

	// Wind speed + icon (w/ direction rotation)
	$('.wind').update(round(weatherData.currently.windSpeed) + ' kts', 1000);

	// Precip Probability
	$('.precip_prob').update(round(weatherData.daily.data[0].precipProbability) + '%');

	// Humidity
	$('.humidity').update(round(weatherData.daily.data[0].humidity * 100) + '%');
}


/* Forecasted weather conditons
 *
 * This is an example of a loop that we can use, while having a PHP loop setup on the display page
 * to create a weekly forecast. Forecast.io provide data for seven days in advanced.
 *
 * Example:
 * <forecast>
 *   <span class="conditions_future"></span>
 *   <?php
 *     for ($i = 1; $i <= 7; $i++) {
 *       echo "<item>";
 *       echo "	<canvas id='weather$i' class='icon'></canvas>";    // Skycon Icons by Dark Sky
 *       echo "	<span class='day day$i'></span><br />";
 *       echo "	<span class='max max$i'></span>";
 *       echo "	<span class='min min$i'></span>";
 *       echo "</item>";
 *     }
 *   ?>
 * </forecast>
 */
function forecastWeather() {

	// Weekly forcast summary
	$('.conditions_future').update(weatherData.daily.summary);
	
	// Loop through the next 7 days
	for(var i = 1; i < weatherData.daily.data.length; i++) {
		var obj = weatherData.daily.data[i];
		var day = obj.time;
		
		// Day title
		var day_day = moment.unix(day).format('dddd');
		$('.day'+i).update(day_day);
		
		// Maximum
		var day_max = round(obj.temperatureMax);
		$('.max'+i).update(day_max+'&deg;');
		
		// Minimum
		var day_min = round(obj.temperatureMin);
		$('.min'+i).update('/ ' + day_min+'&deg;');
		
		// Animated Skycon
		var day_icon = obj.icon;
		skycons.set("weather"+i, day_icon);
	}
			
}