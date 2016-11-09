var angular = require("angular"),
        template = require("./m1m-media.html")
        ;
module.exports = "m1m-media-Module";

function controller($scope) {
    var ctrl = this;
    console.log("m1m-media-log", $scope);
    this.displayDescription = function () {
        console.log("description:", ctrl.nf.description);
    }
    $scope.onDragComplete=function(data,evt){
       console.log("drag success, data:", data);
    }
}
controller.$inject = ["$scope","CommService"];

angular.module(module.exports, ["ngDraggable"]).component("m1mMedia", {
    controller: controller,
    bindings: {nf: "<"},
    template: template
}
);