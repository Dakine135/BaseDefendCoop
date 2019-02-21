var serverGameEngine = require('../serverEngineSrc/main.js');

module.exports = class BaseDefend{
    constructor(){
        let config = {
            ticRate: 20
        }
        this.Engine = new serverGameEngine(config);
    }

    start(){
        this.Engine.start();
    }
}
