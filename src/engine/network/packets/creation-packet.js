class CreationPacket extends require('../packet') {
    constructor() {
        super();
        this._name='creation';
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new CreationPacket(...args);
}