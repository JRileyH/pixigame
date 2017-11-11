class Toolbox {
    constructor(e) {
        this._engine = e;
        this._geometry = require('./geometry')();
        this._ui = require('./ui')(e);
    }

    get Geometry() {
        return this._geom;
    }

    get UI() {
        return this._ui;
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Toolbox(...args);
}

