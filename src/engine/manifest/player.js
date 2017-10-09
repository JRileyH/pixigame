class Player extends require('./entity'){
    constructor(m, texture, x, y) {
        super(m, texture, x, y );

        this.setAction(32,"press",()=>{
            if(this._sprite_type==='spine'){
                this.setState('run');
            }
        })
        
        this.setAction(32,"release",()=>{
            if(this._sprite_type==='spine'){
                this.setState('stop_run');
                this.delay(37, ()=>{
                    this.setState('idle');
                })
                
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
