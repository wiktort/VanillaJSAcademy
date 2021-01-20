import Reef from 'https://cdn.jsdelivr.net/npm/reefjs/dist/reef.es.min.js';

//
//Variables
//
const favorites = "favorites";
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

Reef.prototype.createCards = function(props){
    const _favorites = this.data.favorites || {};
    return props.map(item => {
        return `<div class="card" id="${item.id}">
                    <header>
                        <h2>${item.place}</h2>
                        <button aria-label="add ${item.place} to favorties" aria-pressed="${_favorites[item.id] || false}">
                            <i class="fas fa-heart">
                        </i></button>
                    </header>
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

Reef.prototype.toggleFavourites = function(e){
    if(e.target.closest("button")?.hasAttribute("aria-pressed")){
        
        const id = e.target.closest(".card").id;

        //toggle aria-pressed
        const newVal = e.target.closest("button").getAttribute('aria-pressed') === 'true' ? 'false' : 'true';
        this.data[favorites][id] = newVal;

        //save to localstorage
        this.saveToLocalStorage(favorites, JSON.stringify(this.data[favorites]));
        
    };
};

Reef.prototype.saveToLocalStorage = function(key, value){
    localStorage.setItem(key, value);
};

Reef.prototype.getFromLocalStorage = function(prop, key){
    this.data[prop] = JSON.parse(localStorage.getItem(key));
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
app.getFromLocalStorage(favorites, favorites);
document.addEventListener("click", app.toggleFavourites.bind(app));