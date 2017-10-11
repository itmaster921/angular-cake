var sucressweb;
(function (sucressweb) {
    var CakeCollectionDetailController = (function () {
        function CakeCollectionDetailController($routeParams, cakesDataService, $scope, $location) {
            this.$routeParams = $routeParams;
            this.cakesDataService = cakesDataService;
            this.$scope = $scope;
            this.$location = $location;
            this.selection = ['Red'];
            this.hasErrors = false;
            this.order = {};
            //get the value from the route
            this.cakeID = $routeParams.cakeID;
            this.getCakeData(this.cakeID);
        }
        /**
         * @name goNext
         * @description Go to url of page
         * @param {string} path - url of page to navigate to
         */
        CakeCollectionDetailController.prototype.goNext = function (path) {
            this.$location.path(path);
        };
        ;
        CakeCollectionDetailController.prototype.setOrderData = function (order) {
            console.log(order);
            this.cakesDataService.setCakeOrder(order);
        };
        CakeCollectionDetailController.prototype.getOrderData = function () {
            this.cakeorders = this.cakesDataService.getCakeOrder();
            console.log(this.cakeorders);
        };
        CakeCollectionDetailController.prototype.nextOrderPhase = function (order, path) {
            this.setOrderData(order);
            console.log(order);
            this.goNext(path);
        };
        /**
         * @name getCakeData
         * @description Get list of specfic cake
         * @param {number} cakeID - id of cake
         */
        CakeCollectionDetailController.prototype.getCakeData = function (cakeID) {
            var _this = this;
            var promise = this.cakesDataService.getCakeById(cakeID);
            promise.then(function (result) {
                _this.cakeslists = result;
                _this.initCake();
                _this.initCakePrice();
                console.log(result);
            })
                .catch(function (reason) {
                alert(reason.Message || reason.message);
            });
        };
        /**
         * @name initCakePrice
         * @description initialise price
         * @param (none)
         */
        CakeCollectionDetailController.prototype.initCakePrice = function () {
            return this.order.cakePrice = this.cakeslists.price[0].value;
        };
        CakeCollectionDetailController.prototype.initCake = function () {
            if (this.cakeslists.type == 'seasonal') {
                this.order = {
                    quantityID: { "id": 1, "value": "One (1)" },
                    packageID: { "id": 1, "package": 1, "name": "1 cake" },
                    flavoursID: { "id": 2, "value": "Light Fruit", "price": 0.00 },
                    colours: { colour: {} }
                };
            }
            if (this.cakeslists.type == 'christmas' && this.cakeslists.type_name == 'pudding') {
                this.order = {
                    quantityID: { "id": 1, "value": "One (1)" },
                    packageID: { "id": 1, "package": 1, "name": "1 pan" },
                    flavoursID: { "id": 1, "value": "w/o vanilla rum sauce", "price": 0.00 },
                    colours: { colour: {} }
                };
            }
            if (this.cakeslists.type == 'personal') {
                this.order = {
                    quantityID: { "id": 1, "value": "One (1)" },
                    packageID: { "id": 1, "package": 1, "name": "1 cake" },
                    flavoursID: { "id": 1, "value": "Chocolate", "price": 0.00 },
                    colours: { colour: {} }
                };
            }
            if (this.cakeslists.type == 'christmas' && this.cakeslists.type_name == 'cake') {
                this.order = {
                    quantityID: { "id": 1, "value": "One (1)" },
                    packageID: { "id": 1, "package": 1, "name": "1 cake" },
                    flavoursID: { "id": 1, "value": "Light Fruit", "price": 0.00 },
                    colours: { colour: {} }
                };
            }
            if (this.cakeslists.type == 'christmas' && this.cakeslists.type_name == 'cheesecake') {
                this.order = {
                    quantityID: { "id": 1, "value": "One (1)" },
                    packageID: { "id": 1, "package": 1, "name": "1 cake" },
                    flavoursID: { "id": 1, "value": "Cherry, Coconut, Sorrel, Soursop", "price": 0.00 },
                    colours: { colour: {} }
                };
            }
            if (this.cakeslists.type == 'christmas' && this.cakeslists.type_name == 'cupcakes') {
                this.order = {
                    quantityID: { "id": 1, "value": "One (1)" },
                    packageID: { "id": 1, "package": 6, "name": "1 cake" },
                    flavoursID: { "id": 1, "value": "Red Velvet", "price": 0.00 },
                    colours: { colour: {} }
                };
            }
        };
        /**
         * @name toggleQuantity
         * @description initialise price
         * @param {object},{object} - number of packages, size of package
         */
        CakeCollectionDetailController.prototype.toggleQuantity = function (quantity, packages, flavour) {
            console.log("toggleQuantity called");
            console.log(flavour);
            console.log(quantity.id);
            //console.log(packages.package);
            //console.log(this.order.cakePrice);
            if (flavour.price != '0.00') {
                this.order.cakePrice = flavour.price;
            }
            else {
                this.order.cakePrice = this.cakeslists.price[0].value;
            }
            if (packages.package == 6) {
                this.order.cakePrice = this.cakeslists.price[0].value;
            }
            if (packages.package == 12) {
                this.order.cakePrice = this.cakeslists.price[1].value;
            }
            console.log(quantity.id);
            console.log(packages.package);
            console.log(this.order.cakePrice);
            this.order.cakePrice *= quantity.id;
            return this.order.cakePrice;
        };
        // inject dependencies into controller
        CakeCollectionDetailController.$inject = ["$routeParams", "cakesDataService", "$scope", "$location"];
        return CakeCollectionDetailController;
    }());
    // chaining module and controller creates easier to read code
    angular
        .module("sucreesweb")
        .controller("CakeCollectionDetailController", CakeCollectionDetailController);
})(sucressweb || (sucressweb = {}));
