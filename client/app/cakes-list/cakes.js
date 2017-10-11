var sucreesweb;
(function (sucreesweb) {
    var CakesController = (function () {
        function CakesController(cakesDataService) {
            this.cakesDataService = cakesDataService;
        }
        /**
         * @name getCakeListData
         * @description Get list of all cakes
         * @param null
         */
        CakesController.prototype.getCakeListData = function (categoryName) {
            var _this = this;
            var promise = this.cakesDataService.getCakesByCategory(categoryName);
            promise.then(function (result) {
                _this.cakeslists = result;
                console.log(_this.cakeslists);
            })
                .catch(function (reason) {
                alert(reason.Message || reason.message);
            });
        };
        // inject dependencies into controller
        CakesController.$inject = ["cakesDataService"];
        return CakesController;
    }());
    // chaining module and controller creates easier to read code
    angular
        .module("sucreesweb")
        .controller("CakesController", CakesController);
})(sucreesweb || (sucreesweb = {}));
