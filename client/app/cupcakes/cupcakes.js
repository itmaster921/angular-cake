var sucreesweb;
(function (sucreesweb) {
    var CupCakeController = (function () {
        function CupCakeController(cakesDataService, $routeParams) {
            this.cakesDataService = cakesDataService;
            this.$routeParams = $routeParams;
            // use ng-init to make url without params instead
            //this.categoryName = $routeParams.categoryName;
            //this.getCakeListCategoryData(this.categoryName);
        }
        /**
         * @name getCakeListCategoryData
         * @description Get list of all cakes by category
         * @param {string} categoryName
         */
        CupCakeController.prototype.getCakeListCategoryData = function (categoryName) {
            var _this = this;
            var promise = this.cakesDataService.getCakesByCategory(categoryName);
            console.log(categoryName);
            promise.then(function (result) {
                _this.cakeslists = result;
                console.log(result);
            })
                .catch(function (reason) {
                alert(reason.Message || reason.message);
            });
        };
        // inject dependencies into controller
        CupCakeController.$inject = ["cakesDataService", "$routeParams"];
        return CupCakeController;
    }());
    angular
        .module("sucreesweb")
        .controller("CupCakeController", CupCakeController);
})(sucreesweb || (sucreesweb = {}));
