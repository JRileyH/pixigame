class Rectangle extends require('./shape'){
    constructor(x, y, w, h) {
        
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Rectangle(...args);
}
