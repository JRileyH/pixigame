class Player extends require('./entity'){
    constructor(m, texture, x, y, animation) {
        super(m, texture, x, y );

        this.setAction(32,"release",()=>{
            if(this._sprite_type==='spine'){
                if(this._animation_state==='idle'){
                    this._sprite.state.setAnimation(0, animation, true);
                } else {
                    this._sprite.state.setAnimation(0, 'idle', true);
                }
                
            }
        });
    }

    tick(){
        super.tick();
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Player(...args);
}
