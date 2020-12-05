//
// Variables
//
const app = document.getElementById("app");


//
// Functions
// 

class PirateNews{

    constructor(){
        this.endpoint = "https://vanillajsacademy.com/api/";
        this.prefix = "pirat-api-cache";
    }

    // function that sanitizes text content coming from a third-party, it works by finding any character that’s not a letter or number and converting it into unicode.
     sanitizeHTML = (str) => {
        return str.replace(/[^\w. ]/gi, function (c) {
            return '&#' + c.charCodeAt(0) + ';';
        });
    }

    /**
		 * Dynamically vary the API endpoint
		 * @return {String} The API endpoint
    */

    getEndpoint = () => {
        const random = Math.random();
        if (random < 0.5) return this.endpoint + 'pirates.json';
        return this.endpoint + 'fail.json';
    }

    //fetch data from provided API
    getArticles = async () => {
        const data = await fetch(this.getEndpoint())
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
                        const html = `<li>${this.sanitizeHTML(item.title)}</li>`
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
        if(this.isDataValid(saved, 1000 * 5) ) {
            element.innerHTML = this.createUL(saved.data);
            console.log('saved data')
        } else {
            /* 
            * if data is not valid, get a new one and render it to provided element. 
            * check if the new one contains articles
            * If yes, render the articles and save it in localstorage
            * if not, 1a. check saved data completness and eventually render it, otherwise 1b. render <p> element
            * 2. return at the end 
            */
            this.getArticles()
            .then(response => {
                const articles = response.articles;
                if (!articles){
                    if(saved && saved.data && saved.data.length > 1){
                        console.log("it's expired, but that's better than nothing..")
                        element.innerHTML = this.createUL(saved.data);
                    }else {
                        element.innerHTML = `<p>...It is not a pirates' age ;< Try agian later!</p>`;
                    };
                    return;
                };
                console.log('new fetch');
                element.innerHTML = this.createUL(articles);

                this.saveData(articles);
             })
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