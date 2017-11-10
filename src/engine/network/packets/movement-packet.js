class MovementPacket extends require('../packet') {
    constructor() {
        super();
        this._name='movement';
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new MovementPacket(...args);
}