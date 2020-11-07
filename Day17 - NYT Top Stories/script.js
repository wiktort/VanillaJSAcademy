
const url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=';
const api_key = "TOaFAcUY9rYkjKaNUyhrhYdkwTLXPsA3";
const div = document.querySelector("div#app");
const articlesLoadingAtOnce = 6;
let index = 0;
const articles = [];

//inserting articles into div#app
const loadArticles = (e)=>{
    for(let i = 0; i<articlesLoadingAtOnce; i++){
        if(index >= articles[0].results.length){
            e.target.classList.add("off");
            return
        };
        const result = articles[0].results[index];

        div.innerHTML += `<a href="${result.short_url}" target="_blank" alt=""><article class="art${index}"><div>Section: ${result.section}</div><header><h1>${result.title}</h1><address class="author">${result.byline}</address><p>${result.abstract}</p></header></article></a>`;

        document.querySelector(`.art${index}`).style.backgroundImage = `url('${result.multimedia[0].url}')`;

        index++;
    };
}
//Fetching articles,pushing them to an Array and running loading on the page
const articlesFetch = 
        fetch(url+api_key)
            .then(function(response){
            if(response.ok){
                return response.json();
            } else {
                return Promise.reject(response);
            }})
            .then(response => articles.push(response))
            .then(loadArticles)
            .catch(response => {
                console.log("something went wrong", response);
                div.textContent = "Something went wrong, try to refresh or comeback later";
});

//Setting position after button pressing
const scroll = function() {
  window.scrollTo(0, (document.querySelector(`.art${index - 5}`).offsetTop - `${document.querySelector(".top").offsetHeight}` - 20))
  
}
//Loading / deleting articles when a button was pressed
const addOrDelete = (e)=>{
    if(e.target.classList.contains("more")){
        loadArticles(e);
        scroll();
    } else if (e.target.classList.contains("less")){
        document.querySelector(".more").classList.remove("off");
        index = 0;
        div.innerHTML = "";
        loadArticles(e);
        scroll();
    }
}


document.addEventListener("click", addOrDelete);
