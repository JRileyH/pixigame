class Renderer {
    constructor(e, w=1000, h=700, o={}) {
        this._engine = e;
        this._renderer = PIXI.autoDetectRenderer(w, h, o);
        this._stage = new PIXI.Container();
    }

    start(){
        document.body.appendChild(this._renderer.view);
        this.tick();
    }
    tick(){
        this._renderer.render(this._stage);
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Renderer(...args);
}
