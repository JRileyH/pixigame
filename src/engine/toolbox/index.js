class Toolbox {
    constructor() {
        this._geometry = require('./geometry')(this);
    }

    get Geometry() {
        return this._geom;
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Toolbox(...args);
}

