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
        this.prefix = 'auto-save_';
        
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
        // render data into each input 
        this.inputs.forEach( item => {
            //get data from storage
            const data = localStorage.getItem(`${this.prefix}${item.id}`);
    
            //render value
            item.value = data;
        });
    }

    // hadle 'submit' events & reset the storage
    resetStorage(e) {
        // remove data for the storage
        this.inputs.forEach( item => {
            localStorage.removeItem(`${this.prefix}${item.id}`); 
        });
    } 

    // handle 'input' events
    inputHandle(e) {
        const elem = e.target;
        // check if the id exists otherwise return
        if(!e.target.id) return;
        // save inputs value while typing
        localStorage.setItem(`${this.prefix}${elem.id}`, elem.value)
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