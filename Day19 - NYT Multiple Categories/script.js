const url = 'https://nyt-multiple-categories.wiktor-tuminski.workers.dev/'
const div = document.querySelector("div#app");
const articlesLoadingAtOnce = 2;

const categories = {

    food:{
        url: `${url}food`, 
        index: 0,
        data: []
    },     
    science: {
        url: `${url}science`,
        index: 0,
        data: []
    },
    technology:{
        url: `${url}technology`,
        index: 0,
        data: []
    },
    travel:{
        url: `${url}travel`, 
        index: 0,
        data: []
    },
};

const sessions = {
    articlesCount: 0,
    lastLoad: 0,
}

//inserting sections titles and articles into div#app on first load

const firstLoadArticles=(data, key)=>{
    div.innerHTML += `<h1>Category: <span>${key}</span></h1>`
        const category = categories[key];
        
        for(let i = 0; i<articlesLoadingAtOnce; i++){
            const result = data.results[category.index];
          
            div.innerHTML += `<a href="${result.short_url}" target="_blank" alt=""><article id="article${sessions["articlesCount"]}"><div>Section: ${result.section}</div><header><h2>${result.title}</h2><address class="author">${result.byline}</address><p>${result.abstract}</p></header></article></a>`;
    
            document.querySelector(`#article${sessions["articlesCount"]}`).style.backgroundImage = `url('${result.multimedia[0].url}')`;
            
            sessions["articlesCount"]++;
            sessions["lastLoad"]++;
            category.index++;
        };   
}
//inserting sections titles and articles into div#app when a button was pressed
const loadArticles=(e)=>{
    sessions["lastLoad"] = 0;
    Object.keys(categories).forEach((key)=>{
        const category = categories[key];
        div.innerHTML += `<h1>Category: <span>${key}</span></h1>`
        for(let i = 0; i<articlesLoadingAtOnce; i++){
            if(category.index >= category.data[0].results.length){
                e.target.classList.add("off");
                return
            };
            const result = category.data[0].results[category.index];
          
            div.innerHTML += `<a href="${result.short_url}" target="_blank" alt=""><article id="article${sessions["articlesCount"]}"><div>Section: ${result.section}</div><header><h2>${result.title}</h2><address class="author">${result.byline}</address><p>${result.abstract}</p></header></article></a>`;
    
            document.querySelector(`#article${sessions["articlesCount"]}`).style.backgroundImage = `url('${result.multimedia[0].url}')`;
            
            sessions["articlesCount"]++;
            sessions["lastLoad"]++;
            category.index++;
        };
    })   
}



//Fetching articles from urls provided in the object categories, pushing them to an Array data inside the object and calling the loading function
Object.keys(categories).map(key => {
    fetch(categories[key].url)
        .then(function(response){
        if(response.ok){
            return response.json();
        } else {
            return Promise.reject(response);
        }})
        .then(data=>{
            firstLoadArticles(data, key);
            categories[key].data.push(data);
        })
        .catch(response => {
            console.log("something went wrong", response);
            div.textContent = "Something went wrong, try to refresh or comeback later";
        });
});

//Setting position when a button was pressed
const scroll = function() {
  window.scrollTo(0, (document.querySelector(`#article${sessions["articlesCount"]-sessions["lastLoad"]+1}`).offsetTop - `${document.querySelector(".top").offsetHeight}` - 20))
  
}
//reset sections' indexes after deleting them from the page
const resetIndexes =()=>{
Object.keys(categories).forEach(key=>{
    categories[key].index = 0;
})
};
//Loading / deleting articles when a button was pressed
const addOrDelete = (e)=>{
    if(e.target.classList.contains("more")){
        loadArticles(e);
        scroll();
    } else if (e.target.classList.contains("less")){
        document.querySelector(".more").classList.remove("off");
        resetIndexes();
        div.innerHTML = "";
        loadArticles(e);
        scroll();
    }
}


document.addEventListener("click", addOrDelete);
