module.exports = class Entity extends require('./spine'){
    constructor(m, texture="noimg",
        animation_data={
            speed:0.03,
            frames:23
        }, 
        init_position={ x:0, y:0 },
        init_velocity={ x:0, y:0 }
    ){
        super(m, texture, animation_data, init_position, init_velocity);

        this._sprite.x = init_position.x;
        this._sprite.y = init_position.y;
        this._velocity = init_velocity;
    }

    //coordinate methods
    get x(){
        return this._sprite.x;
    }
    get y(){
        return this._sprite.y;
    }
    move(x, y){
        this._sprite.position.set(x, y)
        return this._sprite.position;
    }
    slide(x, y){
        this._sprite.x += x;
        this._sprite.y += y;
        return this._sprite.position;
    }

}

//Abstract Class
