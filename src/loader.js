module.exports = (cb, handleProgress)=>{
    PIXI.loader
    //colors
        .add('white', 'data:image/gif;base64,R0lGODlhAQABAPAAAP///////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        .add('black', 'data:image/gif;base64,R0lGODlhAQABAPAAAAAAAP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        //gray-
        .add('light-gray', 'data:image/gif;base64,R0lGODlhAQABAPAAAMzMzP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        .add('gray', 'data:image/gif;base64,R0lGODlhAQABAPAAAIiIiP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        .add('dark-gray', 'data:image/gif;base64,R0lGODlhAQABAPAAAERERP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        //red-
        .add('light-red', 'data:image/gif;base64,R0lGODlhAQABAPAAAP/MzP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        .add('red', 'data:image/gif;base64,R0lGODlhAQABAPAAAMxERP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        .add('dark-red', 'data:image/gif;base64,R0lGODlhAQABAPAAAIhERP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        //orange-
        .add('light-orange', 'data:image/gif;base64,R0lGODlhAQABAPAAAP/MRP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        .add('orange', 'data:image/gif;base64,R0lGODlhAQABAPAAAP+IAP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        .add('dark-orange', 'data:image/gif;base64,R0lGODlhAQABAPAAAMxEAP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        //yellow-
        .add('light-yellow', 'data:image/gif;base64,R0lGODlhAQABAPAAAP//zP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        .add('yellow', 'data:image/gif;base64,R0lGODlhAQABAPAAAMzMiP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        .add('dark-yellow', 'data:image/gif;base64,R0lGODlhAQABAPAAAIiIAP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        //green-
        .add('light-green', 'data:image/gif;base64,R0lGODlhAQABAPAAAMz/zP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        .add('green', 'data:image/gif;base64,R0lGODlhAQABAPAAAIjMiP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        .add('dark-green', 'data:image/gif;base64,R0lGODlhAQABAPAAAESIRP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        //blue-
        .add('light-blue', 'data:image/gif;base64,R0lGODlhAQABAPAAAMzM/////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        .add('blue', 'data:image/gif;base64,R0lGODlhAQABAPAAAIiIzP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        .add('dark-blue', 'data:image/gif;base64,R0lGODlhAQABAPAAAEREiP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        //purple-
        .add('light-purple', 'data:image/gif;base64,R0lGODlhAQABAPAAAP+I/////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        .add('purple', 'data:image/gif;base64,R0lGODlhAQABAPAAAMxEzP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
        .add('dark-purple', 'data:image/gif;base64,R0lGODlhAQABAPAAAIgAiP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
    //skeletons
        .add('alien', 'res/skeletons/alien.json')
        .add('knight', 'res/skeletons/knight.json')
    //textures
        .add('blob', 'res/textures/blob.png')
        .add('blobdevil', 'res/textures/blobdevil.png')
        .add('floor', 'res/textures/floor.jpg')
        .add('dialog_box', 'res/textures/DialogBox.png')
        .add('noimg', 'res/textures/noimg.png')
        .on("progress", handleProgress)
        .load(cb);
}