class Geometry {
    constructor() {}

    get Point(...args){
        return new require('./point')(...args);
    }

    get Rectangle(...args){
        return new require('./rectangle')(...args);
    }
    
}

module.exports = (...args)=>{
    //do arguements control here
    return new Gemoetry(...args);
}

