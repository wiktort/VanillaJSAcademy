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

        // get inputs & textareas that are inside of the provided element
        this.inputs = Array.prototype.slice.call(element.children)
        .filter(child => {
            return child.tagName === "INPUT" || child.tagName === "TEXTAREA";
        });


        //render data from storage
        this.renderStorage();
    }

    // render saved data
    renderStorage() {
        // render data into each input 
        this.inputs.forEach( item => {
            //get data from storage
            const data = localStorage.getItem(item.id);
    
            //render value
            item.value = data;
        });
    }

    // hadle 'submit' events & reset storage
    resetStorage(e) {
        this.inputs.forEach( item => {
            // remove data for the storage
            localStorage.removeItem(item.id); 
        });
    } 

    // handle 'input' events
    inputHandle(e) {
        const elem = e.target;
        // save inputs value while typing
        localStorage.setItem(elem.id, elem.value)
    }
    
    
};


//
// Inits
//

//create an instance of storage manager class
const storageManagement = new Form(form);

 // listen form 'input' events
 document.addEventListener("input", storageManagement.inputHandle);

 // listen for submit event in the form
 form.addEventListener("submit", storageManagement.resetStorage.bind(storageManagement), false);