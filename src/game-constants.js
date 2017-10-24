module.exports = {
    Window: {
        id: "GameWindow",
        loader: "LoadWindow",
        width: 1000,
        height: 700,
        options:{
            backgroundColor: 0x308362
        }
    },
    Network: {
        protocol: 'http',
        host: 'localhost',
        port: 1337
    }
}