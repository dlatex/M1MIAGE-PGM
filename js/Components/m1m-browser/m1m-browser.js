var angular = require("angular"),
        template = require("./m1m-browser.html");

module.exports = "m1m-browser-Module";

function controller($scope, CommService) {
    var ctrl = this;
    var browsed = false;
    console.log("m1m-browser-log", $scope);
    this.browse = function (mediaServerId, directoryId) {
        CommService.browse(mediaServerId, directoryId).then(function (data) {
            console.log("Browse", mediaServerId, directoryId, "=>", data);
            ctrl.directories = data.directories;
            ctrl.medias = data.medias;
            ctrl.path = data.name;
            $scope.$applyAsync();
            ctrl.browsed = !ctrl.browsed;
        });
    }
}
controller.$inject = ["$scope", "CommService"];

angular.module(module.exports, []).component("m1mBrowser", {
    controller: controller,
    bindings: {nh: "<", dir: "<"},
    template: template
}
);

