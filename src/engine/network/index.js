class Network {
    constructor(e) {
        this._engine = e;
        this._packets = {};
    }

    packet(id){
        if(!this._packets[id]){
            try{
                let p = require('./packets/'+id+'-packet');
                this._packets[id] = new p();
                this._packets[id].init();
            }catch(e){
                console.error(e);
                return null;
            }
        }
        return this._packets[id];
    }

    tick(){

    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Network(...args);
}