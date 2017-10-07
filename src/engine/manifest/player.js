class Player extends require('./entity'){
    constructor(m, texture, x, y, p2=false) {
        super(m, texture, x, y );

        //up
        this.setAction(p2?38:87,"press",()=>{
            if(!this._sprite_type==='spine'){this._velocity.y-=1;}
        });
        this.setAction(p2?38:87,"release",()=>{
            if(!this._sprite_type==='spine'){this._velocity.y+=1;}
        });
        //down
        this.setAction(p2?40:83,"press",()=>{
            if(!this._sprite_type==='spine'){this._velocity.y+=1;}
        });
        this.setAction(p2?40:83,"release",()=>{
            if(!this._sprite_type==='spine'){this._velocity.y-=1;}
        });
        //left
        this.setAction(p2?37:65,"press",()=>{
            if(!this._sprite_type==='spine'){this._velocity.x-=1;}
        });
        this.setAction(p2?37:65,"release",()=>{
            if(!this._sprite_type==='spine'){this._velocity.x+=1;}
        });
        //right
        this.setAction(p2?39:68,"press",()=>{
            if(this._sprite_type==='spine'){
                this._sprite.state.setAnimation(0, 'walk', true);
            } else {
                this._velocity.x+=1;
            }
        });
        this.setAction(p2?39:68,"release",()=>{
            if(this._sprite_type==='spine'){
                this._sprite.state.setAnimation(0, 'idle', true);
            } else {
                this._velocity.x-=1;
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
