const Lib = (() => {

    const get = (selektor) => Array.prototype.slice.call(document.querySelectorAll(selektor));
    const Constructor = function(selektor){
        this.elements = get(selektor);
    };

    Constructor.prototype.getElements = function(){
        return this.elements;
    };

    Constructor.prototype.first = function(){
        const temArray = this.elements;
        return temArray[0];
    };

    Constructor.prototype.last = function(){
        const temArray = this.elements;
        return temArray[temArray.length -1];
    };

    Constructor.prototype.addClass = function(className){
        this.elements.forEach(item =>{
            item.classList.add(className);
        });
        return this;
    };

    Constructor.prototype.removeClass = function(className){
        this.elements.forEach(item =>{
            item.classList.remove(className);
        });
        return this;
    };

    return Constructor;

})();

const _ = (selektor) => new Lib(selektor);
