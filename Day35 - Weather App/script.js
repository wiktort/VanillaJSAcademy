(async function getLocation (){
    const weatherApiKey = "31358223a28545a4bbdf0d5b56703384";
    const iconsURL = "https://www.weatherbit.io/static/img/icons/";

    const ipapi =  await fetch("https://ipapi.co/json");
    const location  = await ipapi.json();
    
    const _weather = await fetch(`https://api.weatherbit.io/v2.0/current?city=${location.city}&country=${location.country}&key=${weatherApiKey}`);
    const weather = await _weather.json();

    await (function render (data) {
        document.querySelector("#app").innerHTML = `
        <h2>Weather near you:</h2>
        <table>
            <tr>
                <th>City</th>
                <th>Temerature</th>
                <th>Liquid equivalent</th>
                <th>Relative humidity</th>
                <th>Wind speed</th>
                <th>Cloud coverage</th>
                <th>Pressure mb</th>
            </tr>
            <tr>
                <td>
                    ${data.data[0].city_name}
                    <img src="${iconsURL}${data.data[0].weather.icon}.png" alt="an icon with ${data.data[0].weather.description}">
                    <p>${data.data[0].weather.description}</p>    
                </td>
                <td>${data.data[0].temp} ˚C</td>
                <td>${data.data[0].precip} mm/hr</td>
                <td>${data.data[0].rh} %</td>
                <td>${data.data[0].wind_spd} m/s</td>
                <td>${data.data[0].clouds} %</td>
                <td>${data.data[0].pres} hPa</td>
            </tr>
        </table>`;
    })(weather);

    // const render = await render (z2);
})();