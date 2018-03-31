(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller("ToBuyController", ToBuyController)
  .service("ShoppingListCheckOffService", ShoppingListCheckOffService)
  .controller("AlreadyBoughtController", AlreadyBoughtController);

  // --------------------------------------------------------------------------
  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyCtrl = this;

    toBuyCtrl.itemName = "";
    toBuyCtrl.quantity = "";

    toBuyCtrl.addItem = function() {
      ShoppingListCheckOffService.addItemToBuy(toBuyCtrl.itemName, toBuyCtrl.quantity);
    };

    toBuyCtrl.removeItemToBuy = function(index) {
      ShoppingListCheckOffService.removeItemToBuy(index);
    };

    toBuyCtrl.items = ShoppingListCheckOffService.getItems();
  }
  // --------------------------------------------------------------------------
  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBoughtCtrl = this;

    alreadyBoughtCtrl.items = ShoppingListCheckOffService.getItemsBought();
  }
  // --------------------------------------------------------------------------
  function ShoppingListCheckOffService() {
    var service = this;

    service.itemsToBuy = [];
    service.itemsBought = [];
    // ------------------------------------------------------------
    service.addItemToBuy = function(itemName, itemQuantity) {
      var item = {
        name: itemName,
        quantity: itemQuantity
      };
      service.itemsToBuy.push(item);
    };
    // ------------------------------------------------------------
    service.getItems = function() {
      return service.itemsToBuy;
    };
    service.getItemsBought = function() {
      return service.itemsBought;
    };
    // ------------------------------------------------------------
    service.removeItemToBuy = function(index) {
      var item = service.itemsToBuy.splice(index, 1)[0];
      service.itemsBought.push(item);
    }
    // ------------------------------------------------------------
  }
  // --------------------------------------------------------------------------

})();
