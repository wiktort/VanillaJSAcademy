//
// Functions
//


/**
 * Handle proxy changes
 * @param  {Constructor} instance The constructor instance
 */

const handler = function(instance){
    return {
        get: function(obj, prop){
            // check if any property is type of object or array
            const even = elem => elem === Object.prototype.toString.call(obj[prop]);

            if(['[object object]', '[object Array]'].some(even)){
                return new Proxy(obj[prop], handler(instance));
            };
            return obj[prop];
        },
        set: function(obj, prop, newValue){
            obj[prop] = newValue;
            instance.render();
            return true;
        },
        deleteProperty: function(obj, prop){
            delete obj[prop];
            instance.render();
            return true;
        }
    };
};

/**
 * State-based component
 */

const Timer = function({
    selektor, 
    baseTime, 
    mainButton, 
    buttonsID,
    template
}){
    let _state = new Proxy({
        baseTime: baseTime,
        time: baseTime,
        intervalID: "",
        stopped: false,
        mainButton: mainButton,
        template: template,
        elem: document.querySelector(selektor),
    }, 
    handler(this));

    const _this = this;

    // Define setter and getter for data - it allows to change entire state
    Object.defineProperty(_this, 'state', {
        get: function () {
            return _state;
        },
        set: function (data) {
            _state = new Proxy(data, handler(_this));
            _this.render();
            return true;
        }
    });

    // listen for click on item with id === this.resetID within this.elem. After click invoke this.count()
    this.state.elem.addEventListener("click", (e)=>{
        if(e.target.id === buttonsID.resetID){
            this.handleReset(e);
        };
        if(e.target.id === buttonsID.mainID){
            this.handleStartPause(e);
        };
    });
};

/** 
 *  render component
*/

Timer.prototype.render = function(){
    this.state.elem.innerHTML = this.state.template({
        data: this.state, 
        timeConvert: this.timeConvert
    });
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
    this.state.stopped = true;
    // this.render();
    console.log("end");
};

//Reset counter 
Timer.prototype.handleReset = function(){
    clearInterval(this.state.intervalID);
    this.state.time = this.state.baseTime;
    this.state.stopped = false;
    this.count();
};

//Handle Start/Stop
Timer.prototype.handleStartPause = function(e){
    if(!this.state.stopped){
        clearInterval(this.state.intervalID);
        this.state.stopped = !this.state.stopped;
        this.render();
    } else if (this.state.stopped) {
        this.state.stopped = !this.state.stopped;
        this.count();
    };
};

/**
 * clear this.elem 
 * set interval and assign its id to this.intervalID, 
 * if this.time < 0, invoke this.countingEnd
 * */ 
Timer.prototype.count= function(){
    
    this.state.elem.innerHTML = "";

    this.state.intervalID = setInterval(()=>{
        // this.render();
        this.state.time -= 1;

        if(this.state.time < 0){
            this.countingEnd(); 
        };
    }, (1000 * 1));
};

//
//Inits
//

// create new instance of Timer and start counting
const counter = new Timer({
    selektor: "#app",
    baseTime: 120,
    mainButton: ['Pause', 'Start'],
    buttonsID: {resetID: 'reset', mainID: 'start-pause'},
    template: function({data, timeConvert}){
        return `
            <p>${timeConvert(data.time)}</p>
            <div id='buttonWrapper'>
                <button id='reset'>
                    Reset counter
                </button>
                <button id='start-pause'>
                    ${data.mainButton[Number(data?.stopped || false )]}
                </button>
            </div>
        `;
    }
});
counter.count();