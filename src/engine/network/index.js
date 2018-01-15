class Network {
    constructor(e) {
        this._engine = e;
        this._socket = Game.Network.socket;

        this._socket.on('connect_request', function (data) {
            console.log('Connection Information Requested');
        });
        this._socket.on('connect_host', function (data) {
            console.log('Connect As Host');
        });
        this._socket.on('connect_guest', function (data) {
            console.log('Connect As Guest');
        });
    }

    host(){
        this._socket.emit('host', {
            cid: Cookies.get('cid') || null,
            sid: this._socket.id,          
            username: 'Test-Host',
            role: 'host'
        });
    }
    join(rid){
        if(typeof rid !== 'string' && rid.length !== 4){
            throw Error('room id is not valid: '+rid);
            return;
        }
        this._socket.emit('join', {
            cid: Cookies.get('cid') || null,
            sid: Game.Network.socket.id,
            rid: rid,
            username: 'Test-Guest',
            role: 'guest'
        });
    }

    tick(){

    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Network(...args);
}