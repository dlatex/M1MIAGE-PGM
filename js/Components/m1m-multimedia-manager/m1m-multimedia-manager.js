var angular = require("angular"),
        CommModule = require("../../Services/CommModule.js"),
        angularMaterial = require("angular-material"),
        ngDraggable = require("ng-draggable"),
        template = require("./m1m-multimedia-manager.html"),
        media = require("../m1m-media/m1m-media.js"),
        renderer = require("../m1m-renderer/m1m-renderer.js"),
        browser = require("../m1m-browser/m1m-browser")
        ;
module.exports = "m1m-multimedia-manager-Module";

console.log("Init of m1m-multimedia-manager-Module", CommModule, angularMaterial, ngDraggable);

function controller($scope, CommService) {
    var ctrl = this;
    var renderer = null;
    console.log("m1mMultimediaManager:", $scope, CommService);
    this.mediaRenderers = CommService.mediaRenderers;
    this.mediaServers = CommService.mediaServers;
    this.medias = [];
    CommService.onupdate = function () {
        $scope.$applyAsync(); // Mise à jour du rendu
    };
    this.rendererSwitch = function () {
        ctrl.renderer = $scope.model;
    }
    this.browse = function (mediaServerId, directoryId) {
        CommService.browse(mediaServerId, directoryId).then(function (data) {
            console.log("Browse", mediaServerId, directoryId, "=>", data);
            ctrl.directories = data.directories;
            ctrl.medias = data.medias;
            $scope.$applyAsync();
        });
    }
}
controller.$inject = ["$scope", "CommService"];

angular.module(module.exports, [CommModule, angularMaterial, "ngDraggable", media, renderer, browser])
        .component("m1mMultimediaManager", {
            controller: controller,
            bindings: {title: "@"},
            template: template
        });           