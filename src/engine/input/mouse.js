class Mouse {
    constructor() {
        this._subscriptions = {
            press:[],
            release:[],
            during:[],
            scroll:[]
        };
        this._buttons = [];

        document.addEventListener('contextmenu', event => event.preventDefault());

        window.addEventListener("mousedown", event=>{
            if(!this._buttons[event.button]){
                this._buttons[event.button]=true;
                let data = { x:event.offsetX, y:event.offsetY }
                this._process_event(event.button, 'press', data);
            }
            event.preventDefault();
        });
        window.addEventListener("mouseup", event=>{
            this._buttons[event.button]=false;
            let data = { x:event.offsetX, y:event.offsetY }
            this._process_event(event.button, 'release', data);
            event.preventDefault();
        });

        window.addEventListener('wheel', event=>{
            let data = { x:event.offsetX, y:event.offsetY, deltaX: event.deltaX, deltaY: event.deltaY }
            this._process_event(0, 'scroll', data);
            if(event.deltaX>0){this._process_event(1, 'scroll', data);}//left
            if(event.deltaX<0){this._process_event(2, 'scroll', data);}//right
            if(event.deltaY>0){this._process_event(3, 'scroll', data);}//up
            if(event.deltaY<0){this._process_event(4, 'scroll', data);}//down

            event.preventDefault();
        });

    }

    tick(){
        for(let index in this._subscriptions.during){
            if(this._buttons[index]){
                this._process_event(index, 'during');
            }
        }
    }

    _process_event(button, action, data){
        var subscribed_events = this._subscriptions[action][button];
        if(Array.isArray(subscribed_events)){
            for(let subscribed_event of subscribed_events){
                if (typeof subscribed_event === "function") {
                    subscribed_event(data);
                }
            }
        }
    }

    subscribe(button, action, fn){
        this._buttons[button] = false;
        if(!Array.isArray(this._subscriptions[action][button]))this._subscriptions[action][button] = [];
        return this._subscriptions[action][button].push(fn)-1;
    }
    unsubscribe(button, action, id){
        if(id!==undefined){
            this._subscriptions[action][button][id] = undefined;
        }
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Mouse(...args);
}