
/*

You can adjust the weather app by inserting an object with your choices into the weather.app() in inits section.
E.g. of the object: {selektor: "#newDiv", units: "I", displayedElements: ["temperature", "liquid_equivalent", ], icon: false,}

Full list of options:

{
    selektor: "your selektor",
    units: "M - for Metric(default), I - for Fahrenheit".
    displayedElements: [
                //possible options
                "temperature", 
                "liquid_equivalent", 
                "relative_humidity", 
                "wind_speed", 
                "cloud_coverage",
                "pressure_mb" 
            ],
    icon: true(default)/false,
    
}
*/

//
//Functions
//

// function that sanitizes text content coming from a third-party, it works by finding any character that’s not a letter or number and converting it into unicode.
const sanitizeHTML = function (str) {
	return str.replace(/[^\w. ]/gi, function (c) {
		return '&#' + c.charCodeAt(0) + ';';
	});
};


//class that runs the entire app
class Weather {
    constructor(){
        this.forecast = {};

        //
        //Default settings
        //
        this.defaults = {
            city: "Szczytno",
            country: "PL",
            selektor: "#app",
            units: "M",
            displayedElements: [
                "temperature", 
                "liquid_equivalent", 
                "relative_humidity", 
                "wind_speed", 
                "cloud_coverage",
                "pressure_mb" 
            ],
            icon: true,
        };
    }

    async getLocation(){
        // get a default location
        const ipapi =  await fetch("https://ipapi.co/json").then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        })
        .then(response => {
            this.defaults.city = response.city;
            this.defaults.country = response.country;
        })
        .catch(function (err) {
            console.warn('Could not get teh location');
        });
    };
   
    async getForecast(){
        //get weather forecast for provided location
        const weather = await fetch(`https://weather-app.wiktor-tuminski.workers.dev/?city=${this.defaults.city}&country=${this.defaults.country}&units=${this.defaults.units}`).then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        })
        .then(response => {
            this.forecast = response;
        })
        .catch(function (err) {
            console.warn('Could not get the forecast');
        });
    };
    //render the forecast into DOM
    render (data) {
        const iconsURL = "https://www.weatherbit.io/static/img/icons/";

        const values = {
            temperature: ["Temperature", "temp", this.defaults.units === "M" ? "˚C" : "˚F", ],
            liquid_equivalent: ["Liquid equivalent", "precip", this.defaults.units === "M" ? "mm/hr" : "in/hr", ],
            relative_humidity: ["Relative humidity", "rh", "%", ],
            wind_speed: ["Wind speed", "wind_spd", this.defaults.units === "M" ? "m/s" : "mph", ],
            cloud_coverage: ["Cloud coverage", "clouds", "%", ],
            pressure_mb: ["Pressure mb", "pres", "hPa", ],
        };

        //inserting a container for the forecast into provided element
        document.querySelector(this.defaults.selektor).innerHTML = `<div id="forecast" class="box"></div>`;
        
        //inserting first bar-element containing the location into the forecast container
        document.querySelector("#forecast").innerHTML += `
        <div id="top-bar" class="bar">
            <h2>Weather near - <span class="city">${sanitizeHTML(data.data[0].city_name)}, ${sanitizeHTML(data.data[0].country_code)}</span></h2>
        </div>`;

        //inserting an icon into the first bar-element, if needed
        this.defaults.icon 
        ? document.querySelector("#top-bar").innerHTML += `
            <div class="icon">
                    <img src="${iconsURL}${data.data[0].weather.icon}.png" alt="an icon with ${data.data[0].weather.description}">
            </div>
            <p>${sanitizeHTML(data.data[0].weather.description)}</p>`
        : 0;

        //inserting bars with choosen information (temerature, humidity etc.)
        this.defaults.displayedElements.forEach(item => {
            document.querySelector("#forecast").innerHTML += `
            <div class="bar">
                <h2>${values[item][0]}</h2>
                <p>${sanitizeHTML((data.data[0][values[item][1]]).toFixed(2))} ${values[item][2]}</p>
            </div>`;
        });       
    };

    async app(options){
        //Set user settings
        Object.assign(this.defaults, options);

        await this.getLocation();
        await this.getForecast();
        await this.render(this.forecast);
    };

};

//
//inits
//

const weather = new Weather;
weather.app();




