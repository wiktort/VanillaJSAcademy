//
// Functions
//

const Timer = function(selektor, baseTime, step){
    this.baseTime = 60;
    this.time = baseTime;
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
Timer.prototype.render = function(innerHTML, element, data, append, id){
    if(innerHTML){
        element.innerHTML = `<${append}>${data}</${append}>`;
    } else {
        const appendElem = document.createElement(append);
        //set id, if provided
        id && (appendElem.id = id);
        appendElem.textContent = data;
        element.appendChild(appendElem);
    };
};

/**
 * set interval and assign its id to this.intervalID, 
 * if this.time < 0: 1.clear interval, 2.render reset button, 3.reset this.time and 4.log 'end'
 * */ 
Timer.prototype.count= function(){
    this.intervalID = setInterval(()=>{

        this.render(true, this.elem, this.time--, 'p');  

        if(this.time < 0){
            clearInterval(this.intervalID);
            this.render(false,this.elem, 'Reset counter', 'button', this.resetID);
            this.time = this.baseTime;
            console.log("end");
        };
    }, (1000 * this.step));
};

//
//Inits
//

// create new instance of Timer and start counting
const counter = new Timer("#app", 60, 1);
counter.count();