// Main weather icon element (updated dynamically)
const weatherIcon = document.getElementById("main_icon");

// API configuration
const APIKEY = "fbe48596719c08b9ab24ab523d31bb95", // OpenWeatherMap API key
      URL = "https://api.openweathermap.org/data/2.5/weather?US&units=imperial&q="; // Base endpoint (Fahrenheit)

// UI elements
const searchBox = document.getElementById("city"); // City input field
const searchBtn = document.getElementById("btn");  // Search button

// Fetch weather data and update UI
async function checkWeather(city = 'tunisia') {
    // Request weather data for the given city
    const res = await fetch(URL + city + `&appid=${APIKEY}`);
    let data = await res.json();

    // Handles an invalid entry
    if (data.cod != 200) {
        alert("City not found. Try again!");
        return;
    }
    
    // Extract key values from API response
    let condition = data.weather[0].main;
    let temp = data.main.temp;
    let humidity = data.main.humidity;

    // Choose icon + background based on weather condition
    switch (condition) {
        case "Clear":
        case "Clouds":
            // Warm & humid → sunny, otherwise cloudy
            if (temp > 70 && humidity > 50) {
                weatherIcon.src = "img/weather_icons/sunny.png";
                document.body.style.backgroundImage = "url('img/background/sunny.png')";
            } else {
                weatherIcon.src = "img/weather_icons/cloudy.png";
                document.body.style.backgroundImage = "url('img/background/cloudy.png')";
            }
            break;

        // Rain-related conditions share same visuals
        case "Mist":
        case "Fog":
        case "Thunderstorm":
        case "Rain":
        case "Drizzle":
            weatherIcon.src = "img/weather_icons/rain.png";
            document.body.style.backgroundImage = "url('img/background/rain.png')";
            break;

        case "Snow":
            weatherIcon.src = "img/weather_icons/snow.png";
            document.body.style.backgroundImage = "url('img/background/snow.png')";
            break;

        // Fallback icon if condition doesn't match
        default:
            weatherIcon.src = "img/weather_icons/weather1.png";
    }

    // Update text values in UI
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.floor(temp) + "°F";
    document.querySelector(".humidity").innerHTML = humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
}

// Trigger search when button is clicked
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();

    // Validate input: allow only letters and spaces
    if (!/^[a-zA-Z\s]+$/.test(city)) {
        alert("City name should contain only letters and spaces!");
        return;
    }

    // Call function to fetch and display weather data
    checkWeather(city);
});

// Trigger search when Enter key is pressed in input
searchBox.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        const city = searchBox.value.trim();
        
        // Validate input: allow only letters and spaces
        if (!/^[a-zA-Z\s]+$/.test(city)) {
            alert("City name should contain only letters and spaces!");
            return;
        }
        
        // Call function to fetch and display weather data
        checkWeather(city);
    }
});

// Load default city weather on page load
checkWeather();
