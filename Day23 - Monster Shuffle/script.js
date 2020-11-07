const divApp = document.querySelector("div#app");


let monsters = [
	'monster1',
	'monster2',
	'monster3',
	'monster4',
	'monster5',
	'monster6',
	'monster7',
	'monster8',
	'monster9',
	'monster10',
	'monster11',
	'sock'
];


/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
let shuffle = function (array) {

	let currentIndex = array.length;
	let temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
};

// Render monsters
const render = (array)=>{

    // create div container for monsters
    const divRow = document.createElement("div");
    divRow.classList.add("row");

    // shuffle the array with monsters
    shuffle(array.slice()).forEach((monster)=>{

        //create div for a monster 
        const divGrid = document.createElement("div");
        divGrid.classList.add(`grid`);
        //create img for an icon with monster
        const img = document.createElement("img");
        img.setAttribute("src", `img/${monster}.svg`);
        img.setAttribute("alt", `An icon with ${monster}`)
        img.setAttribute("tabindex", `0`);

        //add img to its div container
        divGrid.appendChild(img);

        //add div with the one monster to the main container
        divRow.appendChild(divGrid);
    }); 

    //render the main container into the DOM 
    divApp.appendChild(divRow);
};

render(monsters);

// hide & show monster

const hide =()=>{
    
    document.querySelectorAll("div.grid").forEach((div)=>{
        const divHide = document.createElement("div");
        divHide.classList.add("hide");
        divHide.setAttribute("tabindex", `0`);
        divHide.setAttribute("role", `button`);
        div.prepend(divHide);
    }) 
};

hide();


const game = (e)=> {

    // show monsters
    if(e.target.classList.contains("hide")){
            e.target.classList.toggle("active");
    };

    if(e.target.classList.contains("mix")){
        divApp.innerHTML = "";
        render(monsters);
        hide();
    }
};

document.addEventListener("click",game);