var sucreesweb;
(function (sucreesweb) {
    var CupCakeDetailController = (function () {
        function CupCakeDetailController(cakesDataService, $routeParams, $location) {
            this.cakesDataService = cakesDataService;
            this.$routeParams = $routeParams;
            this.$location = $location;
            this.hasErrors = false;
            this.order = {
                packageID: {
                    "id": 1,
                    "package": 12,
                    "name": "12 standard cupcakes"
                },
                quantityID: {
                    "id": 1,
                    "value": "One (1)"
                },
                flavoursID: {},
                colours: { colour: {} }
            };
            this.cakeID = $routeParams.cakeID;
            this.getCakeData(this.cakeID);
        }
        /**
         * @name goNext
         * @description Go to url of page
         * @param {string} path - url of page to navigate to
         */
        CupCakeDetailController.prototype.goNext = function (path) {
            this.$location.path(path);
            console.log(path);
        };
        ;
        CupCakeDetailController.prototype.setOrderData = function (order) {
            console.log(order);
            this.cakesDataService.setCakeOrder(order);
        };
        CupCakeDetailController.prototype.getOrderData = function () {
            this.cakeorders = this.cakesDataService.getCakeOrder();
            console.log(this.cakeorders);
        };
        CupCakeDetailController.prototype.nextOrderPhase = function (order, path) {
            this.setOrderData(order);
            console.log(order);
            this.goNext(path);
        };
        /**
         * @name getCakeData
         * @description Get list of specfic cake
         * @param {number} cakeID - id of cake
         */
        CupCakeDetailController.prototype.getCakeData = function (cakeID) {
            var _this = this;
            var promise = this.cakesDataService.getCakeById(cakeID);
            promise.then(function (result) {
                _this.cakeslist = result;
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
        CupCakeDetailController.prototype.initCakePrice = function () {
            return this.order.cakePrice = this.cakeslist.price[0].value * this.cakeslist.package_sizes[0].package;
        };
        /**
         * @name toggleQuantity
         * @description initialise price
         * @param {object},{object} - number of packages, size of package
         */
        CupCakeDetailController.prototype.toggleQuantity = function (quantity, packages) {
            console.log("toggleQuantity called");
            if (packages.package == 12) {
                this.order.cakePrice = this.cakeslist.price[0].value * this.cakeslist.package_sizes[0].package;
            }
            if (packages.package == 24) {
                this.order.cakePrice = this.cakeslist.price[1].value * this.cakeslist.package_sizes[1].package;
            }
            console.log(quantity.id);
            console.log(packages.package);
            console.log(this.order.cakePrice);
            this.order.cakePrice *= quantity.id;
            return this.order.cakePrice;
        };
        // inject dependencies into controller
        CupCakeDetailController.$inject = ["cakesDataService", "$routeParams", "$location"];
        return CupCakeDetailController;
    }());
    angular
        .module("sucreesweb")
        .controller("CupCakeDetailController", CupCakeDetailController);
})(sucreesweb || (sucreesweb = {}));
