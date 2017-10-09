class Renderer {
    constructor(e) {
        this._engine = e;
        this._renderer = PIXI.autoDetectRenderer(Game.Window.width, Game.Window.height, Game.Window.options);
        this._stage = new PIXI.Container();
    }

    start(){
        document.getElementById(Game.Window.id).appendChild(this._renderer.view);
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
