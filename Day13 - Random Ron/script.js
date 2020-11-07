const blockquote = document.querySelector("blockquote");
const btn = document.querySelector("button");
const api_url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

// 1st approach - then/catch on fetch
/* let quoteAdding = function(){
    return new Promise(function(resolve, reject){   
    resolve(fetch('api_url')
        .then(function(response){
            if(response.ok){
                return response.json();
            } else {
                return Promise.reject(response);
            }})
        .then(quote => blockquote.textContent = `"${quote.toString()}"`)
        .catch(error => console.error(`Something went wrong`, error))); 
})};

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
const quoteAdding = ()=>{
    quoteFetch()
    .then(function(response){
        if(response.ok){
            return response.json();
        } else {
            return Promise.reject(response);
        }})
    .then(quote => blockquote.textContent = `"${quote.toString()}"`)
    .catch(reason =>rejected(reason)); 
}

quoteAdding();

document.addEventListener("click", (event)=>{
    if(event.target === btn){
        quoteAdding();
    }
});