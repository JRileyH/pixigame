class Enemy extends require('./entity'){
    constructor(sprite) {
        super(sprite)
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Enemy(...args);
}
