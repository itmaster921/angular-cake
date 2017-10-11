var sucressweb;
(function (sucressweb) {
    var CakeDetailController = (function () {
        function CakeDetailController($routeParams, cakesDataService, $location) {
            this.$routeParams = $routeParams;
            this.cakesDataService = cakesDataService;
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
        CakeDetailController.prototype.goNext = function (path) {
            this.$location.path(path);
            console.log(path);
        };
        ;
        CakeDetailController.prototype.setOrderData = function (order) {
            console.log(order);
            this.cakesDataService.setCakeOrder(order);
        };
        CakeDetailController.prototype.getOrderData = function () {
            this.cakeorders = this.cakesDataService.getCakeOrder();
            console.log(this.cakeorders);
        };
        CakeDetailController.prototype.nextOrderPhase = function (order, path) {
            _.extend(this.order.colours.colour, this.selection);
            this.setOrderData(order);
            console.log(order);
            this.goNext(path);
        };
        /**
         * @name getCakeData
         * @description Get list of specfic cake
         * @param {number} cakeID - id of cake
         */
        CakeDetailController.prototype.getCakeData = function (cakeID) {
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
        CakeDetailController.prototype.initCakePrice = function () {
            return this.order.cakePrice = this.cakeslists.price[0].value;
        };
        CakeDetailController.prototype.initCake = function () {
            if (this.cakeslists.type == 'sweetparadise' && this.cakeslists.type_name == 'cupcakes') {
                return this.order = {
                    packageID: { "id": 1, "package": 6 },
                    quantityID: { "id": 1, "value": "One (1)" },
                    flavoursID: { "id": 1, "value": "Chocolate", "price": 0.00 },
                    colours: { colour: [] }
                };
            }
            if (this.cakeslists.type == 'sweetparadise' && this.cakeslists.type_name == 'cake') {
                return this.order = {
                    packageID: { "id": 1, "package": 1 },
                    quantityID: { "id": 1, "value": "One (1)" },
                    flavoursID: { "id": 1, "value": "Chocolate", "price": 0.00 },
                    colours: { colour: [] }
                };
            }
            if (this.cakeslists.type == 'sweetparadise' && this.cakeslists.type_name == 'muffins') {
                return this.order = {
                    packageID: { "id": 1, "package": 4 },
                    quantityID: { "id": 1, "value": "One (1)" },
                    flavoursID: { "id": 1, "value": "Chocolate", "price": 0.00 },
                    colours: { colour: [] }
                };
            }
            if (this.cakeslists.type == 'quartet' && this.cakeslists.type_name == 'cake') {
                this.selection = ['Cherry'];
                return this.order = {
                    packageID: { "id": 1, "package": 1 },
                    quantityID: { "id": 1, "value": "One (1)" },
                    flavoursID: { "id": 1, "value": "Regular", "price": 0.00 },
                    colours: { colour: ['Cherry'] }
                };
            }
        };
        /**
         * @name toggleQuantity
         * @description initialise price
         * @param {object},{object} - number of packages, size of package
         */
        CakeDetailController.prototype.toggleQuantity = function (quantity, packages, flavour) {
            console.log("toggleQuantity called");
            console.log(this.order.cakePrice);
            if (packages.package == 6 || packages.package == 4 || packages.package == 1) {
                this.order.cakePrice = this.cakeslists.price[0].value;
            }
            if (packages.package == 12) {
                this.order.cakePrice = this.cakeslists.price[1].value;
            }
            if (flavour.price > '0.00') {
                this.order.cakePrice = flavour.price * packages.package;
            }
            console.log(flavour);
            console.log(quantity.id);
            console.log(packages.package);
            console.log(this.order.cakePrice);
            this.order.cakePrice *= quantity.id;
            return this.order.cakePrice;
        };
        // toggle selection for a given fruit by name
        CakeDetailController.prototype.toggleSelection = function (colourName) {
            console.log("toggleSelection called");
            this.hasErrors = false;
            var idx = this.selection.indexOf(colourName);
            console.log(idx);
            console.log(this.selection.length);
            // is currently selected
            if (idx > -1) {
                this.selection.splice(idx, 1);
            }
            else {
                this.selection.push(colourName);
            }
            console.log(this.selection);
            if (this.selection.length === 0) {
                console.log("Please pick at least 1 flavour");
                return this.hasErrors = true;
            }
            if (this.cakeslists.type == 'sweetparadise') {
                if (this.selection.length > 3) {
                    console.log("Pick 3 Please");
                    return this.hasErrors = true;
                }
            }
            if (this.cakeslists.type == 'quartet') {
                if (this.selection.length == 3 || this.selection.length > 4 || this.selection.length == 1) {
                    console.log("Pick 2-4 Please");
                    return this.hasErrors = true;
                }
            }
        };
        ;
        // inject dependencies into controller
        CakeDetailController.$inject = ["$routeParams", "cakesDataService", "$location"];
        return CakeDetailController;
    }());
    // chaining module and controller creates easier to read code
    angular
        .module("sucreesweb")
        .controller("CakeDetailController", CakeDetailController);
})(sucressweb || (sucressweb = {}));
