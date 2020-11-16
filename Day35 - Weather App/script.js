// function that sanitizes text content coming from a third-party, it works by finding any character that’s not a letter or number and converting it into unicode.
const sanitizeHTML = function (str) {
	return str.replace(/[^\w. ]/gi, function (c) {
		return '&#' + c.charCodeAt(0) + ';';
	});
};


//
class Weather {
    constructor(){
        this.city = "Szczytno";
        this.country = "PL";
        this.forecast = {};
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
            this.city = response.city;
            this.country = response.country;
        })
        .catch(function (err) {
            console.warn('Could not get teh location');
        });
    };
    async changeLocation(city, country = ""){
        this.city = city;
        this.country = country;

        await this.getForecast();
        await this.render(this.forecast);
    };
    async getForecast(){
        //get weather forecast for provided location
        const weather = await fetch(`https://weather-app.wiktor-tuminski.workers.dev/?city=${this.city}&country=${this.country}`).then(function (response) {
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
        const values = [
            ["Temperature", "temp", "˚C"],
            ["Liquid equivalent", "precip", "mm/hr" ],
            ["Relative humidity", "rh", "%"],
            ["Wind speed", "wind_spd", "m/s" ],
            ["Cloud coverage", "clouds", "%" ],
            ["Pressure mb", "pres", "hPa" ],
        ];
        document.querySelector("#app").innerHTML = `
            <div id="forecast" class="box"></div>
            <div id="location" class="box">
                <h2>Change location</h2>
                <form>
                    <input type="text" required="true" placeholder="City (Required)" id="city">
                    <input type="text" placeholder="Country code" id="country">
                    <input type="submit" value="Change" id="change">
                </form>
            </div>`;
        
        document.querySelector("#forecast").innerHTML += `
        <div id="top-bar" class="bar">
            <h2>Weather near - <span class="city">${sanitizeHTML(data.data[0].city_name)}, ${sanitizeHTML(data.data[0].country_code)}</span></h2>
            <div class="icon">
                    <img src="${iconsURL}${data.data[0].weather.icon}.png" alt="an icon with ${data.data[0].weather.description}">
            </div>
            <p>${sanitizeHTML(data.data[0].weather.description)}</p>
        </div>`;

        values.forEach(item => {
            document.querySelector("#forecast").innerHTML += `
            <div class="bar">
                <h2>${item[0]}</h2>
                <p>${sanitizeHTML((data.data[0][item[1]]).toFixed(2))} ${item[2]}</p>
            </div>`;
        });       
    };

    async app(){
        
        await this.getLocation();
        await this.getForecast();
        await this.render(this.forecast);
    };

};

//inits
const weather = new Weather;
weather.app();

const clickListner = (e) => {
    if(e.target.id === "change"){
        e.preventDefault();
        const city = document.getElementById("city").value;
        const country = document.getElementById("country").value; 
        if(city === "") return;
        weather.changeLocation(city, country);
    };
};

document.addEventListener("click", clickListner);

