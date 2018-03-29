(function() {
'use strict';

angular.module("lunchCheckerApp", [])

.controller("lunchCheckerController", lunchCheckerController);

lunchCheckerController.$inject = ["$scope"];

function lunchCheckerController($scope) {
  $scope.message = "";
  $scope.dishesText = "";
  var nDishes = 0;

  $scope.displayMessage = function() {
    if ($scope.dishesText === "") {
      $scope.message = "Please enter data first";
      return;
    }
    var nDishes = calculateNDishes($scope.dishesText);
    if (nDishes <= 3) {
      $scope.message = "Enjoy!";
      return;
    }
    $scope.message = "Too much!";
  };

  function calculateNDishes(stringText) {
    var arrayText = stringText.split(",");
    return arrayText.length;
  }
}

})();
