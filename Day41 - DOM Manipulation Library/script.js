const Lib = (() => {

    const get = (selektor) => Array.prototype.slice.call(document.querySelectorAll(selektor));
    const Constructor = function(selektor){
        this.elements = get(selektor);
    };

    Constructor.prototype.getElements = function(){
        return this.elements;
    };

    Constructor.prototype.FirstAndLast = function(){
        const temArray = this.elements;
        return [temArray[0] || "",temArray[temArray.length -1] || ""];
    }
    Constructor.prototype.addClass = function(className){
        this.elements.forEach(item =>{
            item.classList.add(className);
        });
    };

    Constructor.prototype.removeClass = function(className){
        this.elements.forEach(item =>{
            item.classList.remove(className);
        });
    };

    return Constructor;

})();

const _ = (selektor) => new Lib(selektor);
