module.exports = class Packet{
    constructor(){
        this._name = null;
        this._socket = Game.Network.socket;
        this._subscriptions = [];
    }

    get Name(){
        return this._name;
    }

    get Socket(){
        return this._socket;
    }

    init(){
        this._socket.on(this._name, this.recieve.bind(this));
    }

    subscribe(fn){
        return this._subscriptions.push(fn)-1;
    }
    unsubscribe(id){
        if(id!==undefined){
            this._subscriptions[id] = undefined;
        }
    }

    send(recipient, data){
        if(data===undefined)data = {};
        data._sender = 'riley';
        data._timestamp = new Date().getTime();
        data._recipient = recipient===undefined?'all':recipient;
        this._socket.emit(this._name, data);
    }

    recieve(data){
        for(let action of this._subscriptions){
            if(typeof(action)==='function'){
                action(data);
            }
        }
    }
}

//Abstract Class
