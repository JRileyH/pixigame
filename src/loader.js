module.exports = (cb, handleProgress)=>{
    PIXI.loader
    //skeletons
        .add('alien', 'res/skeletons/alien.json')
    //textures
        .add('blob', 'res/textures/blob.png')
        .add('blobdevil', 'res/textures/blobdevil.png')
        .add('noimg', 'res/textures/noimg.png')
        .on("progress", handleProgress)
        .load(cb);
}