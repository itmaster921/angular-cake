var sucreesweb;
(function (sucreesweb) {
    var CakeOrderController = (function () {
        function CakeOrderController(cakesDataService, $scope, $location, $routeParams, Upload) {
            this.cakesDataService = cakesDataService;
            this.$scope = $scope;
            this.$location = $location;
            this.$routeParams = $routeParams;
            this.Upload = Upload;
            this.showDatePicker = false;
            this.hasNoData = false;
            this.hasErrors = false;
            this.cakeorder = {};
            //get the value from the route
            this.cakeID = $routeParams.cakeID;
            this.getCakeData(this.cakeID);
            this.cakeorder = this.cakesDataService.getCakeOrder();
            this.hasNoData = this.checkforData(this.cakeorder);
            this.galleryImages = [
                { thumb: '../assets/images/gallery/mini-1.jpg', img: '../assets/images/gallery/1.jpg' },
                { thumb: '../assets/images/gallery/mini-2.jpg', img: '../assets/images/gallery/2.jpg' },
                { thumb: '../assets/images/gallery/mini-3.jpg', img: '../assets/images/gallery/3.jpg' },
                { thumb: '../assets/images/gallery/mini-4.jpg', img: '../assets/images/gallery/4.jpg' },
                { thumb: '../assets/images/gallery/mini-5.jpg', img: '../assets/images/gallery/5.jpg' },
                { thumb: '../assets/images/gallery/mini-6.jpg', img: '../assets/images/gallery/6.jpg' },
                { thumb: '../assets/images/gallery/mini-12.jpg', img: '../assets/images/gallery/12.jpg' },
                { thumb: '../assets/images/gallery/mini-8.jpg', img: '../assets/images/gallery/8.jpg' },
                { thumb: '../assets/images/gallery/mini-13.jpg', img: '../assets/images/gallery/13.jpg' },
                { thumb: '../assets/images/gallery/mini-14.jpg', img: '../assets/images/gallery/14.jpg' },
                { thumb: '../assets/images/gallery/mini-11.jpg', img: '../assets/images/gallery/11.jpg' }
            ];
        }
        /**
         * @name getCakeData
         * @description Get list of specfic cake
         * @param {number} cakeID - id of cake
         */
        CakeOrderController.prototype.getCakeData = function (cakeID) {
            var _this = this;
            var promise = this.cakesDataService.getCakeById(cakeID);
            promise.then(function (result) {
                _this.cakeslists = result;
                console.log(result);
            })
                .catch(function (reason) {
                alert(reason.Message || reason.message);
            });
        };
        CakeOrderController.prototype.openDatePicker = function () {
            console.log("show date");
            this.showDatePicker = true;
        };
        CakeOrderController.prototype.closeDatePicker = function () {
            console.log("hide date");
            this.showDatePicker = false;
        };
        CakeOrderController.prototype.checkforData = function (cakeorder) {
            console.log(cakeorder);
            return angular.equals({}, cakeorder);
            //console.log(this.hasErrors);
        };
        CakeOrderController.prototype.saveCakeOrder = function (finalorder, picFile) {
            var _this = this;
            if (picFile) {
                this.cakesDataService.uploadSelectedFile(picFile)
                    .then(function (result) {
                    _this.cakeURL = result;
                    _this.finishcakeOrder(finalorder, _this.cakeURL);
                });
            }
            else {
                this.cakeURL = '';
                this.finishcakeOrder(finalorder, this.cakeURL);
            }
        };
        CakeOrderController.prototype.finishcakeOrder = function (finalorder, cakeImgURL) {
            var _this = this;
            var currentOrder = {
                "cake": this.cakeslists,
                "cakeorder": this.cakeorder,
                "contact": finalorder,
                "cakeImgURL": cakeImgURL
            };
            console.log(currentOrder);
            var promise = this.cakesDataService.saveOrder(currentOrder);
            promise.then(function (result) {
                console.log(result);
                _this.cakesDataService.sendOrderEmail(currentOrder);
                _this.cakesDataService.goNext('/thank-you');
            })
                .catch(function (reason) {
                alert(reason.Message || reason.message);
            });
        };
        // inject dependencies into controller
        CakeOrderController.$inject = ["cakesDataService", "$scope", "$location", "$routeParams", "Upload"];
        return CakeOrderController;
    }());
    // chaining module and controller creates easier to read code
    angular
        .module("sucreesweb")
        .controller("CakeOrderController", CakeOrderController);
})(sucreesweb || (sucreesweb = {}));
