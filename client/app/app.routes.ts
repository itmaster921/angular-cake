module sucreesweb {

    // use strict to capture any errors that may escape without
    "use strict";

    // using routeProvider as routing in this app
    function routeProvider($routeProvider: ng.route.IRouteProvider){

			$routeProvider
        // collections (cake) page
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

        // specific paradise cake page
        .when("/collections/paradise/:cakeID", {
					templateUrl: "app/cake/cake.html",
					controller: "CakeDetailController",
					controllerAs: "vm"
				})

        // specific fourseasons cake page
        .when("/collections/quartets/:cakeID", {
					templateUrl: "app/cake/seasonal-cake.html",
					controller: "CakeDetailController",
					controllerAs: "vm"
				})

        // specific snowflake cake page
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

        // specific celebration cake page
        .when("/collections/celebration/:cakeID", {
					templateUrl: "app/cake/collection-cake.html",
					controller: "CakeCollectionDetailController",
					controllerAs: "vm"
				})

        // specific cupcake page
        .when("/cupcake/:cakeID", {
					templateUrl: "app/cupcakes/cupcakes-single.html",
					controller: "CupCakeDetailController",
					controllerAs: "vm"
				})

        // cake order page
        .when("/collections/cake-order/:cakeID", {
					templateUrl: "app/cake-order/order.html",
					controller: "CakeOrderController",
					controllerAs: "vm"
				})

        // cupcake order page
        .when("/cupcake-order/:cakeID", {
					templateUrl: "app/cupcakes/cupcakeorder.html",
					controller: "CakeOrderController",
					controllerAs: "vm"
				})

        // thank you page
        .when("/thank-you", {
					templateUrl: "app/thanks/thanks.html",
					controller: "ThanksController",
					controllerAs: "vm"
				})

        // home page
        .when("/home", {
          templateUrl: "app/home/home.html",
          controller: "HomeController",
          controllerAs: "vm"
        })

        // contact page
        .when("/contact", {
          templateUrl: "app/contact/contact.html",
          controller: "",
          controllerAs: "vm"
        })

        // cupcakes page
        .when("/cupcakes", {
          templateUrl: "app/cupcakes/cupcakes.html",
          controller: "CupCakeController",
          controllerAs: "vm"
        })

        // pastry menu page
        .when("/menu", {
          templateUrl: "app/menu/menu.html",
          controller: "",
          controllerAs: "vm"
        })

        // gluten-free page
        .when("/gluten", {
          templateUrl: "app/gluten/gluten.html",
          controller: "HomeController",
          controllerAs: "vm"
        })

        // custom cake page
        .when("/customcakes", {
          templateUrl: "app/custom/customcakes.html",
          controller: "CakeOrderController",
          controllerAs: "vm"
        })

        // faqs page
        .when("/faqs", {
          templateUrl: "app/home/faqs.html",
          controller: "HomeController",
          controllerAs: "vm"
        })

        // default route to default to
				.otherwise({
					redirectTo: "/home"
				})


    }
    // inject routeProvider dependency
    routeProvider.$inject = ["$routeProvider"]

    // chaining module and config creates easier to read code
    angular
        .module("sucreesweb")
        .config(routeProvider);
}
