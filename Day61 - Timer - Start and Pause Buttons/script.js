//
// Functions
//

const Timer = function(selektor, baseTime, step){
    this.state = {
        baseTime: baseTime,
        time: baseTime,
        step: step,
        intervalID: "",
        resetID: 'reset',
        stopped: false,
        mainButton: {
            ID: 'start-pause',
            text: ['Pause', 'Start']
        },
        elem: document.querySelector(selektor),
    }

    // listen for click on item with id === this.resetID within this.elem. After click invoke this.count()
    this.state.elem.addEventListener("click", (e)=>{
        if(e.target.id === this.state.resetID){
            this.handleReset(e);
        };
        if(e.target.id === this.state.mainButton.ID){
            this.handleStartPause(e);
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

// 1.clear interval, 2.reset this.time and 3.log 'end'
Timer.prototype.countingEnd = function(){
    clearInterval(this.state.intervalID);
    this.state.time = this.state.baseTime;
    console.log("end");
};

//Reset counter 
Timer.prototype.handleReset = function(){
    clearInterval(this.state.intervalID);
    this.state.time = this.state.baseTime;
    this.state.stopped = false;
    this.count();
};
//
//Reset counter 
Timer.prototype.handleStartPause = function(e){
    if(!this.state.stopped){
        clearInterval(this.state.intervalID);
        this.state.stopped = !this.state.stopped;
        e.target.textContent = this.state.mainButton.text[Number(this.state.stopped)];
    } else if (this.state.stopped) {
        this.state.stopped = !this.state.stopped;
        this.count();
    };
};

/**
 * clear this.elem and create container for time (this.timeBox)
 * render reset button,
 * set interval and assign its id to this.intervalID, 
 * if this.time < 0, invoke this.countingEnd
 * */ 
Timer.prototype.count= function(){
    
    this.state.elem.innerHTML = "";
    const mainButtonText = this.state.mainButton.text[Number(this.state?.stopped || false )];
    this.timeBox = this.render(false, this.state.elem, this.timeConvert(this.state.time), "p");

    const buttomWrapper = this.render(false, this.state.elem, "", 'div', 'buttonWrapper');
    this.render(false, buttomWrapper, mainButtonText, 'button', this.state.mainButton.ID);
    this.render(false, buttomWrapper, 'Reset counter', 'button', this.state.resetID);

    this.state.intervalID = setInterval(()=>{
        this.render(true, this.timeBox, this.timeConvert(this.state.time));  
        this.state.time -= 1;

        if(this.state.time < 0){
            this.countingEnd(); 
        };
    }, (1000 * this.state.step));
};

//
//Inits
//

// create new instance of Timer and start counting
const counter = new Timer("#app", 120, 1);
counter.count();