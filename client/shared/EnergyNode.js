(function(exports){



   exports.EnergyNode = function(){

       var testClass = function() {
           this.constructor = function(){

           }
           this.test = function(){
               return "Hello World"
           }
           this.constructor();
       }

        return testClass;
    };

})(typeof exports === 'undefined'? this['EnergyNode']={}: exports);
