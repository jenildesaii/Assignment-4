// Add an event listener to the button with the ID 'getWeather'
// When the button is clicked, this function runs
document.getElementById('getWeather').addEventListener('click', () => {
    // Get the value entered in the input field with the ID 'city'
    const city = document.getElementById('city').value;
    
    // Check if the user entered a city name
    if (city) {
        // If a city name was entered, fetch the weather data for that city
        fetchWeather(city);
    } else {
        // If no city name was entered, show an alert asking for a city name
        alert('Please enter a city name');
    }
});

// This function fetches weather data for a given city
async function fetchWeather(city) {
    // here is RapidAPI key
    const apiKey = '149f35ce8emshe3b20f0271eec45p166a1ajsn17e571d52cd0'; 
    
    // The URL to fetch weather data from, using the city name
    const url = `https://open-weather13.p.rapidapi.com/city/${city}/EN`;

    // Options for the fetch request, including method and headers
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com',
            'X-RapidAPI-Key': apiKey
        }
    };

    try {
        // Make the request to the API and wait for the response
        const response = await fetch(url, options);
        
        // Convert the response to JSON format
        const data = await response.json();

        // Check if the API returned a successful response (status code 200)
        if (data.cod === 200) {
            // If successful, create HTML to display the weather information
            const weatherHtml = `
                <h2>${data.name}</h2>
                <p>Temperature: ${data.main.temp} °F</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
            // Insert the weather information into the 'weatherResult' element
            document.getElementById('weatherResult').innerHTML = weatherHtml;
        } else {
            // If the API response was not successful, show the error message
            document.getElementById('weatherResult').innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        // If there was an error with the request, show a generic error message
        document.getElementById('weatherResult').innerHTML = `<p>Failed to fetch data. Please try again later.</p>`;
    }
}
