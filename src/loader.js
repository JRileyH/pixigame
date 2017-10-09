module.exports = (cb, handleProgress)=>{
    PIXI.loader
    //skeletons
        .add('alien', 'res/skeletons/alien.json')
        .add('knight', 'res/skeletons/knight.json')
    //textures
        .add('blob', 'res/textures/blob.png')
        .add('blobdevil', 'res/textures/blobdevil.png')
        .add('floor', 'res/textures/floor.jpg')
        .add('noimg', 'res/textures/noimg.png')
        .on("progress", handleProgress)
        .load(cb);
}