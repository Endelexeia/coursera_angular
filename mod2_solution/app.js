(function(){
'use strict';

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var tobuy = this;

  tobuy.items = ShoppingListCheckOffService.getToBuyItems();
  tobuy.boughtitems = ShoppingListCheckOffService.getBoughtItems();

  tobuy.itemName = "";
  tobuy.itemQuantity = "";
  tobuy.everythingBoughtMessage = ShoppingListCheckOffService.getBoughtEverything();
  tobuy.nothingBoughtMessage = ShoppingListCheckOffService.getBoughtNothing();
  console.log(tobuy.everythingBoughtMessage);

  tobuy.addItem = function () {
    ShoppingListCheckOffService.addItem(tobuy.items,tobuy.itemName, tobuy.itemQuantity);
    tobuy.everythingBoughtMessage = ShoppingListCheckOffService.getBoughtEverything();
    tobuy.nothingBoughtMessage = ShoppingListCheckOffService.getBoughtNothing();
    console.log (tobuy.items)
  }

  tobuy.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
    tobuy.everythingBoughtMessage = ShoppingListCheckOffService.getBoughtEverything();
    tobuy.nothingBoughtMessage = ShoppingListCheckOffService.getBoughtNothing();

  };

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService)
{
  var bought  = this;
  bought.items = ShoppingListCheckOffService.getBoughtItems();


}


function ShoppingListCheckOffService()
{
  var service = this;

  //lists of items
  var tobuyitems = [{name:"cookies",quantity:1},{name:"cola",quantity:2},{name:"peanuts",quantity:5},{name:"nutella",quantity:4},{name:"sprite",quantity:7}];
  var boughtitems = [];

  var boughteverything = false;
  var boughtnothing = true;

  service.addItem = function (lista,itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    lista.push(item);

    service.checkToBuyAndBought();

  };

  service.removeItem = function (itemIndex) {
    var removed = tobuyitems[itemIndex];

    tobuyitems.splice(itemIndex, 1);
    console.log(tobuyitems.length)

    boughtitems.push(removed);
    service.checkToBuyAndBought();
  };

  service.getToBuyItems = function () {
    return tobuyitems;
  };

  service.getBoughtItems = function () {
    return boughtitems;
  };

  service.getBoughtEverything = function(){
    return boughteverything;
  }

  service.getBoughtNothing = function(){
    return boughtnothing;
  }

  service.checkToBuyAndBought = function(){
    if(tobuyitems.length == 0){
      boughteverything = true;
    }
    else{
      boughteverything = false;
    }

    if(boughtitems.length == 0){
      boughtnothing = true;
    }
    else{
      boughtnothing = false;
    }

  }


}

})();
