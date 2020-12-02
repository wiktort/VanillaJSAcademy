//
// Variables
//
const form = document.getElementById("save-me");
const submit = document.querySelector("#save-me [type='submit']");


//
// Functions
//

class Form  {
    constructor(selektor){
        this.prefix = 'form-auto-save';
        
        // get form elements
        
        this.formElements = [...document.querySelectorAll(`${selektor} select, ${selektor} input, ${selektor} textarea`)],

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
        this.formElements.forEach( item => {
            // check if the id or name exists and render value
            // in case of type=radio check which item value was saved and set checked=true for it
            // set "",if there is not any data for the item in the object 
            const attr = item.id || item.name;
            if(attr){
                if(item.type === "checkbox"){
                    item.checked = data[attr];
                } else if(item.type === "radio"){
                    item.checked = data[attr] === item.value ? true : false;
                } else{
                    item.value = data[attr] || "";
                };
            } else {
                return;
            };
            
        });
    }

    // hadle 'submit' events & reset the storage
    resetStorage(e) {
        // remove data for the storage
            localStorage.removeItem(this.prefix); 
    } 

    // handle 'input' events
    inputHandle(e) {
    
        // get previously saved data in the localStorage
        const data = localStorage.getItem(this.prefix);
        // parse the data into an object or create a new object 
        const saved = JSON.parse(data) || {};

        // create storage key for the new object (id or name)
        const attr = e.target.id || e.target.name;

        //  add current element's checked status or value to the object
        if(attr){
            (e.target.type === "checkbox" )
            ? saved[attr] = e.target.checked
            : saved[attr] = e.target.value;
        } else {
            return;
        };
        //save the object in the local storage as a string
        localStorage.setItem(this.prefix, JSON.stringify(saved));
    }
    
    
};


//
// Inits
//

//create an instance of storage manager class
const storageManagement = new Form('#save-me');

 // listen form 'input' events
 document.addEventListener("input", storageManagement.inputHandle.bind(storageManagement));

 // listen for submit event in the form
 form.addEventListener("submit", storageManagement.resetStorage.bind(storageManagement));