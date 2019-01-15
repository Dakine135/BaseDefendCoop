const path = require('path');

module.exports = {
    mode: 'development',
    entry: './clientGameSrc/game.js',
    devtool: 'inline-source-map',
    output: {
        filename: 'clientGame.js',
        path: path.resolve(__dirname, './client/js')
    }
}
