//
// Functions
//

const Timer = function(selektor, baseTime, step){
    this.baseTime = baseTime;
    this.time = this.baseTime;
    this.step = step;

    this.intervalID;
    this.resetID = 'reset'

    this.elem = document.querySelector(selektor);
    // listen for click on item with id === this.resetID within this.elem. After click invoke this.count()
    this.elem.addEventListener("click", (e)=>{
        if(e.target.id === this.resetID){
            this.count();
        };
    });
};

/** 
 *  render provided element and data by innerHTML or appendChild
*/
Timer.prototype.render = function(innerHTML, parentElement, data, element, id){
    if(innerHTML){
       return parentElement.innerHTML = element ? `<${element}>${data}</${element}>` : data;
    } else {
        const appendElem = document.createElement(element);
        //set id, if provided
        id && (appendElem.id = id);

        appendElem.textContent = data;
        parentElement.appendChild(appendElem);
        
        return appendElem;
    };
};

/**
 * get numeber of minutes and seconds from provided number
 * add 0 before each one (if it is shorter than 2 digits) by invoking convert()
 * return mm:ss 
 */
Timer.prototype.timeConvert = function(num){
    const minutes = Math.floor(num / 60);
    const seconds = num % 60;

    convert = (data) =>{
        const stringData = data.toString();
        const padData = stringData.padStart(2, '0')

        return padData;
    };

    return convert(minutes) + ":" + convert(seconds);
};

// 1.clear interval, 2.render reset button, 3.reset this.time and 4.log 'end'
Timer.prototype.countingEnd = function(){
    clearInterval(this.intervalID);
    this.render(false, this.elem, 'Reset counter', 'button', this.resetID);
    this.time = this.baseTime;
    console.log("end");
};

/**
 * clear this.elem and create container for time (this.timeBox)
 * set interval and assign its id to this.intervalID, 
 * if this.time < 0, invoke this.countingEnd
 * */ 
Timer.prototype.count= function(){
    
    this.elem.innerHTML = "";
    this.timeBox = this.render(false, this.elem, "", "p");

    this.intervalID = setInterval(()=>{
        this.render(true, this.timeBox, this.timeConvert(this.time));  
        this.time -= 1;

        if(this.time < 0){
            this.countingEnd();
        };
    }, (1000 * this.step));
};

//
//Inits
//

// create new instance of Timer and start counting
const counter = new Timer("#app", 120, 1);
counter.count();