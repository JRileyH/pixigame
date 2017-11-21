class Button extends require('../clickable-component'){
    constructor(u, text='', options={}) {
        options.component_type = 'button';
        super(u, text, options);
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Button(...args);
}
