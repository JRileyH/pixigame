module.exports = (cb, handleProgress)=>{
    PIXI.loader
        .add('blob', 'res/textures/blob.png')
        .add('blobdevil', 'res/textures/blobdevil.png')
        .add('noimg', 'res/textures/noimg.png')
        .on("progress", handleProgress)
        .load(cb);
}