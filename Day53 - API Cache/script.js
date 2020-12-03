//
// Variables
//
const app = document.getElementById("app");


//
// Functions
// 

class PirateNews{

    constructor(){
        this.apiURL = "https://vanillajsacademy.com/api/pirates.json";
        this.prefix = "pirat-api-cache";
    }
    
    //fetch data from provided API
    getArticles = async () => {
        const data = await fetch(this.apiURL)
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
                return Promise.reject(response);
            }
        })
        .catch(err => {
            console.warn(err);
            return err;
        });

        //return promise 
        return data;
    }

    // get items from provided data and return 'ul' list with items
    createUL = (articles) => {
       return ('<ul>' +
                    articles.map(item => {
                        const html = `<li>${item.title}</li>`
                        return html;
                    }).join("") +
                '</ul>');
    }

    // saved provided data & timestamp in localStorage
    saveData = (articles) => {
        const data = {
            data: articles,
            timestamp: new Date().getTime(),
        };

        localStorage.setItem(this.prefix, JSON.stringify(data));
    } 

    isDataValid = (saved, goodFor) => {

        // Check that there's data, and a timestamp key
        if (!saved || !saved.data || !saved.timestamp) return false;
    
        // Get the difference between the timestamp and current time
        var difference = new Date().getTime() - saved.timestamp;
    
        return difference < goodFor;
    
    };

    render = (element) => {
        // get data from localStorage
        const saved = JSON.parse(localStorage.getItem(this.prefix));

        //check is data is valid. If yes, render  elements form createUL in provided element
        if(this.isDataValid(saved, 1000 * 60 * 2) ) {
            element.innerHTML = this.createUL(saved.data);
        } else {
            /* 
            * if data is not valid, get a new one and render it to provided element. 
            * check if the new one contains articles
            * if not, render <p> element and return. If yes, render the articles and save it in localstorage
            */
            this.getArticles()
            .then(response => {
                const articles = response.articles;
                if (!articles){
                    element.innerHTML = `<p>...It is not a pirates' age ;< Try agian later!</p>`;
                    return;
                };

                element.innerHTML = this.createUL(articles);

                this.saveData(articles);
             });
        };

    }

}


//
// Inits
//

// create a new instance
const news = new PirateNews();

// render headlines into div#app
news.render(app);