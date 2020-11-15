(async function getLocation (){
    const weatherApiKey = "31358223a28545a4bbdf0d5b56703384";
    const iconsURL = "https://www.weatherbit.io/static/img/icons/";

    const x =  await fetch("https://ipapi.co/json");
    const y = await x.json();
    
    const z = await fetch(`https://api.weatherbit.io/v2.0/current?city=${y.city}&country=${y.country}&key=${weatherApiKey}`);
    const z2 = await z.json();
    console.log(z, z2);

    function render (data) {
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
    };

    const s = await render (z2);
})();