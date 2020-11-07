const blockquote = document.querySelector("blockquote");
const btn = document.querySelector("button");
const api_url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
const quotesBase = [];

// 1st approach - then/catch on fetch
/* let quoteAdding = function(){
    return new Promise(function(resolve, reject){   
    resolve(fetch(api_url)
        .then(function(response){
            if(response.ok){
                return response.json();
            } else {
                return Promise.reject(response);
            }})
        .then(data => quoteVeryfing(data))
        .catch(error => console.error(`Something went wrong`, error))); 
})};

const quoteVeryfing = (data)=>{
    const quote = `${data.toString()}`;
    // instead od data.toString() you would use data[0]
    if(quotesBase.indexOf(quote) === -1  || quotesBase.length - quotesBase.indexOf(quote) > 50){
        quotesBase.push(quote);
        blockquote.textContent = `"${quote}"`
    } else {
        quoteAdding();
        console.log("Again?!")
    }
}

quoteAdding();

document.addEventListener("click", (event)=>{
    if(event.target === btn){
        quoteAdding();
    }
}); */

// 2nd apprach - then/catch on promise
const quoteFetch = ()=>{
   return new Promise(function(resolve, reject){   
    resolve(fetch(api_url));
    reject(`Something went wrong`);
})};

const rejected = (reason)=> {
    blockquote.textContent = `Something went wrong... Try to press the button below ↓`;
    console.error(`Something went wrong`,reason) ;
};

const quoteAdding=()=>{
    quoteFetch()
    .then(function(response){
        if(response.ok){
            return response.json();
        } else {
            return Promise.reject(response);
        }})
    .then(quote => quoteVeryfing(quote))
    .catch(reason =>rejected(reason)); 
}

const quoteVeryfing = (data)=>{
    const quote = `${data.toString()}`;
    // instead od data.toString() you would use data[0]
    if(quotesBase.indexOf(quote) === -1  || quotesBase.length - quotesBase.indexOf(quote) > 50){
        quotesBase.push(quote);
        blockquote.textContent = `"${quote}"`
    } else {
        quoteAdding();
        console.log("Again?!")
    }
}

quoteAdding();

document.addEventListener("click", (event)=>{
    if(event.target === btn){
        quoteAdding();
    }
});

// 3rd approach - Chris'es version
// Get a fresh quote and render it into the DOM
/* const getQuote = function () {
	// Get a Ron Swanson quote
	fetch('http://ron-swanson-quotes.herokuapp.com/v2/quotes').then(function (response) {
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject(response);
		}
	}).then(function (data) {

		// If the quote is in the quotes array, it's been used already in the last 50 clicks
		// Recursively call getQuote() to fetch another quote instead
		// Then return to quit the function
		if (quotesBase.indexOf(data[0]) > -1) {
			getQuote();
			return;
		}

		// Otherwise, show the quote and add it to the quotes array
		blockquote.textContent = data[0];
		quotesBase.push(data[0]);

		// If there are 50 items in the quotes array, reset it
		if (quotesBase.length > 50) {
			quotesBase = [];
		}

	}).catch(function (error) {
		blockquote.textContent = '[Something went wrong, sorry!] I have a joke for you... The government in this town is excellent, and uses your tax dollars efficiently.';
	});
};

getQuote();
document.addEventListener("click", (event)=>{
    if(event.target === btn){
        getQuote();
    };
}); */