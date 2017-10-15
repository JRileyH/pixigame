class Keyboard {
    constructor() {
        this._subscriptions = {
            press:[],
            release:[],
            during:[]
        };
        this._keys = [];

        window.addEventListener("keydown", event=>{
            //console.log(event.keyCode);
            if(!this._keys[event.keyCode]){
                this._keys[event.keyCode]=true;
                this._process_event(event.keyCode, 'press');
            }
            event.preventDefault();
        });
        window.addEventListener("keyup", event=>{
            this._keys[event.keyCode]=false;
            this._process_event(event.keyCode, 'release');
            event.preventDefault();
        });

    }

    tick(){
        for(let index in this._subscriptions.during){
            if(this._keys[index]){
                this._process_event(index, 'during');
            }
        }
    }

    _process_event(key, action){
        var subscribed_events = this._subscriptions[action][key];
        if(Array.isArray(subscribed_events)){
            for(let subscribed_event of subscribed_events){
                if (typeof subscribed_event === "function") {
                    subscribed_event();
                }
            }
        }
    }

    subscribe(key, action, fn){
        this._keys[key] = false;
        if(!Array.isArray(this._subscriptions[action][key]))this._subscriptions[action][key] = [];
        return this._subscriptions[action][key].push(fn)-1;
    }
    unsubscribe(key, action, id){
        if(id!==undefined){
            this._subscriptions[action][key][id] = undefined;
        }
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Keyboard(...args);
}

