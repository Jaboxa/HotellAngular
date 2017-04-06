
//skapade ett globalt objekt som har alla mina användardata
var reservation= {
        indate:"",
        outdate:"",
        grown:"",
        child:"",
        fname:"",
        ename:"",
        email:"",
        phone:"",
        room:""
};
angular.module('starter', ['ionic'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .controller("ListController", function ($scope, $http, $state) {
    $http.get("js/roomdata.json").success(function (data) {

      //lagra all data i artists en hel array med object
      $scope.rooms = data;

      //väljer rum
      $scope.whichRoom = $state.params.rId;

      //användardata incheckningsdatum, utcheckning, antal vuxna, antal barn
      //förnanm, efternamn, email och telefonnr
      $scope.reservation=reservation;

      //stoppar in room i reservationsobjektet
      $scope.roomfunction=function(room){
        reservation.room = room;
      }  
      //implementerar inte denna ännu, kommer användas för att kolla antal personer i ett rum
      $scope.sumPeople = function(){
       return reservation.grown + reservation.child;
      };
    })//avslutar http success
  })//avslutar listcontroller

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    
    //trycker ner tabbarna längst ned på android
    $ionicConfigProvider.tabs.position('bottom');
    
    //konfigurerar en stateprovider
    $stateProvider
      .state("tabs", {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })
      .state("tabs.startpage", {
        url: "/startpage",
        views: {
          "startpage-tab": {
            templateUrl: "templates/startpage.html",
          }
        }
      })
      .state("tabs.reserve", {
        url: "/reserve",
        views: {
          "reserve-tab": {
            templateUrl: "templates/reserve.html",
            controller: "ListController",
          }
        }
      })
      .state("tabs.roomlist", {
        url: "/roomlist",
        views: {
          "roomlist-tab": {
            templateUrl: "templates/roomlist.html",
            controller: "ListController"
          }
        }
      })
      .state("tabs.roomdetail", {
        url: "/roomlist/:rId",
        views: {
          "roomlist-tab": {
            templateUrl: "templates/roomdetail.html",
            controller: "ListController"
          }
        }
      })
      .state("tabs.userinput", {
        url: "/userinput",
        views: {
          "userinput-tab": {
            templateUrl: "templates/userinput.html",
            controller: "ListController"
          }
        }
      })
      .state("tabs.confirmation", {
        url: "/confirmation",
        views: {
          "confirmation-tab": {
            templateUrl: "templates/confirmation.html",
            controller: "ListController"
          }
        }
      })

    $urlRouterProvider.otherwise("tab/startpage");
  })


