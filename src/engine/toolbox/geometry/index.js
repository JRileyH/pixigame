class Geometry {
    constructor() {}

    Point(...args){
        var p = require('./point');
        return new p(...args);
    }

    Rectangle(...args){
        var p = require('./rectangle');
        return new p()(...args);
    }

    tick() {
        
    }

    
}

module.exports = (...args)=>{
    //do arguements control here
    return new Geometry(...args);
}

