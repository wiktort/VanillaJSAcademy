import Reef from 'https://cdn.jsdelivr.net/npm/reefjs/dist/reef.es.min.js';

//
//Variables
//
const favorites = "favorites";
const visited = "visited";
const filters = {
    all: "all",
    faves: "faves",
    notVisited: "not-visited",
    visited: "visited"
};
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

Reef.prototype.convertString = (word) =>{
    switch(word?.toLowerCase().trim()){
        case "yes": case "true": case "1": return true;
        case "no": case "false": case "0": case null: return false;
        default: return Boolean(word);
    }
};

Reef.prototype.filterPlaces = function(data){
    return data.filter(item => {
        const faves = this.convertString(this.data.favorites[item.id]);
        const visit = this.convertString(this.data.visited[item.id]);

        switch (this.data.filter) {
            case filters.visited:
                return visit === true;
            case filters.notVisited:
                return visit !== true;
            case filters.faves:
                return faves === true;
            default:
                return item;
        };}
    );
};

Reef.prototype.createCards = function(props){
    const _favorites = this.data.favorites || {};
    const _visited = this.data.visited || {};
    const filteredPlaces = this.filterPlaces(props) || [];
    return filteredPlaces
        .map(item => {
            return `<div class="card" id="${item.id}">
                        <header>
                            <h2>${item.place}</h2>
                            <div class="buttons">
                                <button data-type="${favorites}" aria-label="add ${item.place} to favorties" aria-pressed="${_favorites[item.id] || false}">
                                    <i class="fas fa-heart"></i>
                                </button>
                                <button data-type="${visited}" aria-label="mark ${item.place} as visited" aria-pressed="${_visited[item.id] || false}">
                                    <i class="fas fa-check-square"></i>
                                </button>
                            </div>
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

Reef.prototype.handleClick = function(e){

    //toggle Favourites and Visited
    if(e.target.closest('button')?.hasAttribute("aria-pressed")){
        const ID = e.target.closest(".card").id;
        const type = e.target.closest("button").dataset.type;

        //toggle aria-pressed
        const newVal = e.target.closest("button").getAttribute('aria-pressed') === 'true' ? 'false' : 'true';
        this.data[type][ID] = newVal;

        //save to localstorage
        this.saveToLocalStorage(type, JSON.stringify(this.data[type]))
    };
};

Reef.prototype.handleFiltering = function(e){
    if(e.target.closest("div.filters")){
        this.data.filter = e.target.value;
    };
};

Reef.prototype.saveToLocalStorage = function(key, value){
    localStorage.setItem(key, value);
};

Reef.prototype.getFromLocalStorage = function(key){
    this.data[key] = JSON.parse(localStorage.getItem(key)) || {};
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
app.getFromLocalStorage(favorites);
app.getFromLocalStorage(visited);
document.addEventListener("click", app.handleClick.bind(app), true);
document.addEventListener("change", app.handleFiltering.bind(app));