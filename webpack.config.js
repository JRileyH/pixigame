module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname+'/build',
        filename: 'app.bundle.js'
    },
    module: {
       rules: [
           {
               test: /\.js$/,
               exclude: /(node_modules)/,
               use: {
                   loader: 'babel-loader',
                   options: {
                   presets: ['es2015','babili']
                   }
               }
           }
       ]
   },
   devtool: "source-map"
};