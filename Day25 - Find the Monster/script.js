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
        //create button that is hiding the monster
        const buttonGrid = document.createElement("button");
        buttonGrid.classList.add(`grid`);
        buttonGrid.id = (monster);    
        buttonGrid.setAttribute("aria-live", `polite`);
        //create img for an icon with monster
        const img = document.createElement("img");
        img.setAttribute("src", `img/${monster}.svg`);
        img.setAttribute("alt", `An icon with ${monster}`)

        //add img to its div container
        buttonGrid.appendChild(img);

        //add div with the one monster to the main container
        divRow.appendChild(buttonGrid);
    }); 

    //render the main container into the DOM 
    divApp.appendChild(divRow);
};

render(monsters);


// 

const popup = document.querySelector(".popup");
const mixButton = document.querySelector(".mix");

const checkMonster = (monster) => {
    //show gameover popup
    const gameOver = () => {
        popup.style.visibility = "visible";
    };
    // check if all of the monsters are shown otherwise call gameOver()
    const checkAll = () =>{ monster.closest(".row").childNodes.forEach(child =>{
        child.classList.contains("active") ? 0 : gameOver();
    })};
    // check the last last monster. If it was sock call checkAll()
    monster.id.includes("sock") ? checkAll() : 0;
};

const game = (e)=> {
    //close popup
    if(e.target.classList.contains("closepopup")){
        popup.style.visibility = "hidden";
    };
    // call checkMonsters()
    checkMonster(e.target);
    // show monsters
    if(e.target.classList.contains("grid")){
            // e.target.classList.add("active");
            e.target.style.visibility = "hidden";
            //change icon's visibility
            (e.target.firstChild).style.visibility = "visible";
                // a way to change visivility for all of the children (in case there is more) 
                // Array.prototype.slice.call(e.target.childNodes).forEach(child=>{child.style.visibility = "visible"});
            //show mix button
            mixButton.style.visibility = "visible";
    };
    //refresh monsters
    if(e.target.classList.contains("mix")){
        mixButton.style.visibility = "hidden";
        divApp.innerHTML = "";
        render(monsters);
    }
};

document.addEventListener("click",game);