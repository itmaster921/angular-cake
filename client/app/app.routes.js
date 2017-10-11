var sucreesweb;
(function (sucreesweb) {
    // use strict to capture any errors that may escape without
    "use strict";
    // using routeProvider as routing in this app
    function routeProvider($routeProvider) {
        $routeProvider
            .when("/collections", {
            templateUrl: "app/cakes-list/cakes.html",
            controller: "CakesController",
            controllerAs: "vm"
        })
            .when("/christmas", {
            templateUrl: "app/cakes-list/christmas.html",
            controller: "CakesController",
            controllerAs: "vm"
        })
            .when("/collections/paradise/:cakeID", {
            templateUrl: "app/cake/cake.html",
            controller: "CakeDetailController",
            controllerAs: "vm"
        })
            .when("/collections/quartets/:cakeID", {
            templateUrl: "app/cake/seasonal-cake.html",
            controller: "CakeDetailController",
            controllerAs: "vm"
        })
            .when("/collections/seasonal/:cakeID", {
            templateUrl: "app/cake/collection-cake.html",
            controller: "CakeCollectionDetailController",
            controllerAs: "vm"
        })
            .when("/collections/holiday/:cakeID", {
            templateUrl: "app/cake/collection-cake.html",
            controller: "CakeCollectionDetailController",
            controllerAs: "vm"
        })
            .when("/collections/celebration/:cakeID", {
            templateUrl: "app/cake/collection-cake.html",
            controller: "CakeCollectionDetailController",
            controllerAs: "vm"
        })
            .when("/cupcake/:cakeID", {
            templateUrl: "app/cupcakes/cupcakes-single.html",
            controller: "CupCakeDetailController",
            controllerAs: "vm"
        })
            .when("/collections/cake-order/:cakeID", {
            templateUrl: "app/cake-order/order.html",
            controller: "CakeOrderController",
            controllerAs: "vm"
        })
            .when("/cupcake-order/:cakeID", {
            templateUrl: "app/cupcakes/cupcakeorder.html",
            controller: "CakeOrderController",
            controllerAs: "vm"
        })
            .when("/thank-you", {
            templateUrl: "app/thanks/thanks.html",
            controller: "ThanksController",
            controllerAs: "vm"
        })
            .when("/home", {
            templateUrl: "app/home/home.html",
            controller: "HomeController",
            controllerAs: "vm"
        })
            .when("/contact", {
            templateUrl: "app/contact/contact.html",
            controller: "",
            controllerAs: "vm"
        })
            .when("/cupcakes", {
            templateUrl: "app/cupcakes/cupcakes.html",
            controller: "CupCakeController",
            controllerAs: "vm"
        })
            .when("/menu", {
            templateUrl: "app/menu/menu.html",
            controller: "",
            controllerAs: "vm"
        })
            .when("/gluten", {
            templateUrl: "app/gluten/gluten.html",
            controller: "HomeController",
            controllerAs: "vm"
        })
            .when("/customcakes", {
            templateUrl: "app/custom/customcakes.html",
            controller: "CakeOrderController",
            controllerAs: "vm"
        })
            .when("/faqs", {
            templateUrl: "app/home/faqs.html",
            controller: "HomeController",
            controllerAs: "vm"
        })
            .otherwise({
            redirectTo: "/home"
        });
    }
    // inject routeProvider dependency
    routeProvider.$inject = ["$routeProvider"];
    // chaining module and config creates easier to read code
    angular
        .module("sucreesweb")
        .config(routeProvider);
})(sucreesweb || (sucreesweb = {}));
