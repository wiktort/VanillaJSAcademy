//
// Variables
//
const form = document.getElementById("save-me");
const submit = document.querySelector("#save-me [type='submit']");


//
// Functions
//

class Form  {
    constructor(element){
        this.prefix = 'form-auto-save';
        
        // get inputs & textareas that are inside of the provided element
        this.inputs = Array.prototype.slice.call(element.children)
        .filter(child => {
            return child.tagName === "INPUT" || child.tagName === "TEXTAREA";
        });


        //render data from the storage
        this.renderStorage();
    }

    // render saved data
    renderStorage() {
        //get data from storage and change it back into object
        const dataString = localStorage.getItem(this.prefix);
        const data = JSON.parse(dataString);
        if(!data) return;
        // render data into each input 
        this.inputs.forEach( item => {
            // check if id exists and render value
            if(!item.id) return;
            item.value = data[item.id] || "";
        });
    }

    // hadle 'submit' events & reset the storage
    resetStorage(e) {
        // remove data for the storage
            localStorage.removeItem(this.prefix); 
    } 

    // handle 'input' events
    inputHandle(e) {
        const elem = e.target;
        
        // save inputs value while typing

        // create an object with values
        const temp = this.inputs.reduce((acc, current) => {
            // check if the id exists otherwise return acc
            if(!current.id) return acc;
            acc[current.id] = current.value;
            return acc;
        }, {});
        //save the object in the local storage as a string
        localStorage.setItem(this.prefix, JSON.stringify(temp));
    }
    
    
};


//
// Inits
//

//create an instance of storage manager class
const storageManagement = new Form(form);

 // listen form 'input' events
 document.addEventListener("input", storageManagement.inputHandle.bind(storageManagement));

 // listen for submit event in the form
 form.addEventListener("submit", storageManagement.resetStorage.bind(storageManagement));