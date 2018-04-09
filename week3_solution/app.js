(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrawItDownController', NarrawItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBaseURL', "http://davids-restaurant.herokuapp.com")
  .directive('foundItem', FoundItem)
  .directive('foundList', FoundListDirective);

  // ------------------------------------------------------------
  function FoundListDirective() {
    var ddo = {
      templateUrl: 'foundList.html',
      scope: {
        foundItems: '<',
        title: '@',
        onRemove: '&'
      },
      controller: FoundListDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }
  // ------------------------------------------------------------
  // function FoundList() {
  //   var ddo = {
  //     templateUrl: "foundList.html",
  //     scope: {
  //       list: '=',
  //       title: '@title'
  //     }
  //   };
  //   return ddo;
  // }
  // ------------------------------------------------------------
  function FoundItem() {
    var ddo = {
      template: "({{item.short_name}}) {{item.name}} <br> {{item.description}} <br>"
    };

    return ddo;
  }
  // ------------------------------------------------------------
  // ------------------------------------------------------------
  // THE INNER DIRECTIVE CONTROLLER
  // ------------------------------------------------------------
  // ------------------------------------------------------------
  function FoundListDirectiveController() {
    var list = this;

    list.isEmpty = function() {
      if (list.foundItems.length == 0) {
         return true;
      }
      return false;
    };
  }

  // ------------------------------------------------------------
  // ------------------------------------------------------------
  // THE MAIN CONTROLLER
  // ------------------------------------------------------------
  // ------------------------------------------------------------
  NarrawItDownController.$inject = ['MenuSearchService'];
  function NarrawItDownController(MenuSearchService) {
    var list = this;
    var origTitle = "Find menu items ";

    list.searchText = "";
    list.foundItems = [];
    list.allMenuItems = [];
    list.title = list.foundItems.length + " items found";


    // ---------------------------------------------------------------------
    list.testMethod = function(strValue) {
      alert("testMethod: " + strValue);
    };
    // ---------------------------------------------------------------------
    list.findItems = function(strValue) {
      list.foundItems = [];
      list.title = "looking for elements...";

      if (strValue === "") {
        list.title = "Write your search text!"
        return;
      }

      var promise = MenuSearchService.getMatchedMenuItems();

      promise.then(function (response) {
        list.allMenuItems = response.data.menu_items;
        for (var i = 0; i < list.allMenuItems.length; i++) {
          if (list.allMenuItems[i].description.indexOf(strValue) >= 0) {
            list.foundItems.push(list.allMenuItems[i]);
          }
        }
        list.title = list.foundItems.length + " items found";
      })
      .catch(function(error) {
        console.log("something went wrong");
        console.log(error);
        list.title = "Something went wrong";
      });
    };
    // ---------------------------------------------------------------------
    list.removeItem = function(index) {
      list.foundItems.splice(index, index + 1);
      list.title = list.foundItems.length + " items found";
    };
    // ---------------------------------------------------------------------
  }
  // ---------------------------------------------------------------------
  // ---------------------------------------------------------------------
  // THE SERVICE
  // ---------------------------------------------------------------------
  // ------------------------------------------------------------
  MenuSearchService.$inject = ['$http', 'ApiBaseURL'];
  function MenuSearchService($http, ApiBaseURL) {
    var service = this;

    service.getMatchedMenuItems = function() {
      var response = $http({
        method: 'GET',
        url: (ApiBaseURL + '/menu_items.json')
      });

      return response;
    };
  }
})();
