class TextBox extends require('../ui-component'){
    constructor() {
        super();
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new TextBox(...args);
}
