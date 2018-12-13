(function(exports){

    var testClassDef = class testClass{
        constructor(inputString){
            this.string = inputString;
            this.name = "blah";
        }
        toString(){
            return this.string + this.name;
        }
    }

   exports.init = testClassDef;

})(typeof exports === 'undefined'? this['EnergyNode']={}: exports);
