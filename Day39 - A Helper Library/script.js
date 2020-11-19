
const helperLibrary = (()=>{


    //
    // Methods
    //

    const methods = {};


    //Convert a NodeList to an array.
    methods.convert = (nodeList) => {
        return Array.prototype.slice.call(nodeList);
    };


    //Get the first matching element in the DOM.
    methods.getFirstElement = (selektor) => {
        return document.querySelector(selektor);
    };

    //Get all matching elements in the DOM as an array.
    methods.getAllElements = (selektor) => {
        return methods.convert(document.querySelectorAll(selektor));
    };

    //Add a class to all elements in an array.
    methods.addClass = (array, className) => {
        array.forEach((item) => {
            item.classList.add(className)
        });
    };

    //Remove a class from all elements in an array.
    methods.removeClass = (array, className) => {
        array.forEach((item) => {
            item.classList.remove(className);
        });
    };

    //Return the object with methods
    return methods;

})();
