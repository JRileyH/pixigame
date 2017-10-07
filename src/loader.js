module.exports = (cb, handleProgress)=>{
    PIXI.loader
    //textures
        .add('blob', 'res/textures/blob.png')
        .add('blobdevil', 'res/textures/blobdevil.png')
        .add('noimg', 'res/textures/noimg.png')
    //skeltons
        .add('alien', 'res/skeletons/alien.json')
        .on("progress", handleProgress)
        .load(cb);
}