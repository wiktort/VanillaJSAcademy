import Reef from 'https://cdn.jsdelivr.net/npm/reefjs/dist/reef.es.min.js';

//
// Methods
// 

Reef.prototype.getData = async function(){
    await fetch('https://vanillajsacademy.com/api/places.json')
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
                return Promise.reject(response);
            }}
        )
        .then(data => this.data.places = data)
        .catch(err => console.warn(err));
};

Reef.prototype.createCards = function(data){
    return data.map(item => {
        return `<div class="card">
                    <h2>${item.place}</h2>
                    <div class="wrapper">
                        <div class="img">
                            <img src='${item.img}' alt='photo of ${item.place}'>
                        </div>
                        <div class="data">
                            <p><strong>Location:</strong> ${item.location}</p>
                            <p><strong>Web:</strong> <a href='${item.url}'>link</a></p>
                            <p><strong>Description:</strong> ${item.description}</p>
                        </div>
                    </div>
                </div>`; 
    }).join('');
};


//
// Inits
// 

const app = new Reef('#app', {
    data: {},
    template: function(props){
        if(!props.places){
            return '<div>Loading...</div>';
        } else {
            return props.places.length 
                ? '<div class="cards-wrapper">' + this.createCards(props.places) + '</div>'
                : "<p><em>Couldn't get any data this time... Please try again later!</em></p>";
        };
    }
});
app.getData();
app.render();