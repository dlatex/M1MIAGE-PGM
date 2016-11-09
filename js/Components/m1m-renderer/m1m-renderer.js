var angular = require("angular"),
        template = require("./m1m-renderer.html")
        ;

module.exports = "m1m-renderer-Module";

function controller($scope, CommService) {
    var ctrl = this;
    var etat = false ;
    console.log("MediaRenderer", $scope);
    this.play = function () {
        console.log("play", ctrl.nr.name);
        CommService.play(ctrl.nr.id);
    }
    this.pause = function () {
        console.log("pause", ctrl.nr.name);
        CommService.pause(ctrl.nr.id);
    }
    this.stop = function () {
        console.log("stop", ctrl.nr.name);
        CommService.stop(ctrl.nr.id);
    }
    this.setVolume = function() {
        console.log(ctrl.nr.name,"volume :",$scope.volume);
        CommService.setVolume(ctrl.nr.id,$scope.volume);
    } 
    $scope.onDropComplete=function(data,evt){
        console.log("drop success, data:", data);
        console.log("load", ctrl.nr.name,data.serverId,data.mediaId);
        CommService.loadMedia(ctrl.nr.id,data.serverId,data.mediaId);
        ctrl.etat = !ctrl.etat ;
    }
}

controller.$inject = ["$scope", "CommService"];

angular.module(module.exports, ["ngDraggable","ngMaterial"])
        .component("m1mRenderer", {
            controller: controller,
            bindings: {nr: "<"},
            template: template
        });
