class Player extends require('./entity'){
    constructor(m, texture, x, y, p2=false) {
        super(m, texture, x, y );

        //up
        this.setAction(p2?38:87,"press",()=>{
            this._velocity.y-=1;
        });
        this.setAction(p2?38:87,"release",()=>{
            this._velocity.y+=1;
        });
        //down
        this.setAction(p2?40:83,"press",()=>{
            this._velocity.y+=1;
        });
        this.setAction(p2?40:83,"release",()=>{
            this._velocity.y-=1;
        });
        //left
        this.setAction(p2?37:65,"press",()=>{
            this._velocity.x-=1;
        });
        this.setAction(p2?37:65,"release",()=>{
            this._velocity.x+=1;
        });
        //right
        this.setAction(p2?39:68,"press",()=>{
            this._velocity.x+=1;
        });
        this.setAction(p2?39:68,"release",()=>{
            this._velocity.x-=1;
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
