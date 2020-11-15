(async function getLocation (){
    const weatherApiKey = "31358223a28545a4bbdf0d5b56703384";
    const iconsURL = "https://www.weatherbit.io/static/img/icons/";

    const ipapi =  await fetch("https://ipapi.co/json");
    const location  = await ipapi.json();
    
    const _weather = await fetch(`https://api.weatherbit.io/v2.0/current?city=${location.city}&country=${location.country}&key=${weatherApiKey}`);
    const weather = await _weather.json();

    await (function render (data) {
        const values = [
            ["Temperature", "temp", "˚C"],
            ["Liquid equivalent", "precip", "mm/hr" ],
            ["Relative humidity", "rh", "%"],
            ["Wind speed", "wind_spd", "m/s" ],
            ["Cloud coverage", "clouds", "%" ],
            ["Pressure mb", "pres", "hPa" ],

        ];

        document.querySelector("#app").innerHTML = `
            <h2>Weather near you - <span class="city">${data.data[0].city_name}, ${data.data[0].country_code}</span></h2>
            <div class="box icon">
                    <img src="${iconsURL}${data.data[0].weather.icon}.png" alt="an icon with ${data.data[0].weather.description}">
                    <p>${data.data[0].weather.description}</p>
            </div>`;

        values.forEach(item => {
            document.querySelector("#app").innerHTML += `
            <div class="box">
                <h3>${item[0]}</h3>
                <p>${(data.data[0][item[1]]).toFixed(2)} ${item[2]}</p>
            </div>`;
        });
    })(weather);
})();