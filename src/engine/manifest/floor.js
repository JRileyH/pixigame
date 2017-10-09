class Floor extends require('./entity'){
    constructor(m, texture, x, y) {
        super(m, texture, x, y );

        this._sprite2 = new PIXI.Sprite(
            PIXI.loader.resources[texture].texture
        );
        this._sprite2.x = x - this._sprite2.width;
        this._sprite2.y = y;
        this._manifest.add(this._sprite2);

        this.setAction(32,"press",()=>{
            this.delay(this._frames_in_cycle/2, ()=>{
                this._velocity.x = 20;
            });            
        })
        
        this.setAction(32,"release",()=>{
            this.delay(this._frames_in_cycle/2, ()=>{
                this._velocity.x = 0;
            });     
        });
    }

    tick(){
        super.tick();
        this._sprite.x += this._velocity.x;
        this._sprite2.x += this._velocity.x;
        if(this._sprite.x>=this._sprite.width){this._sprite.x=-this._sprite.width;}
        if(this._sprite2.x>=this._sprite2.width){this._sprite2.x=-this._sprite2.width;}
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Floor(...args);
}
