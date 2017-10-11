var sucreesweb;
(function (sucreesweb) {
    // data service must implement interface ??
    var cakesDataService = (function () {
        function cakesDataService($http, $q, $location, Upload) {
            this.$http = $http;
            this.$q = $q;
            this.$location = $location;
            this.Upload = Upload;
            this.cakeorder = {};
            var url = "api/cakes/";
        }
        cakesDataService.prototype.setCakeOrder = function (order) {
            this.cakeorder = order;
            console.log("setCakeOrder called");
            console.log(this.cakeorder);
        };
        cakesDataService.prototype.getCakeOrder = function () {
            console.log("getCakeOrder() called");
            console.log(this.cakeorder);
            return this.cakeorder;
        };
        cakesDataService.prototype.sendOrderEmail = function (order) {
            var deferred = this.$q.defer();
            var url = "api/sendrequest/";
            console.log("sendOrderEmail called");
            //return this.$http.post(url, order);
            this.$http.post(url, order)
                .then(function (response) {
                deferred.resolve(response.data);
            }, deferred.reject);
            return deferred.promise;
        };
        /**
         * @name getCakes
         * @description get json list of all cakes
         * @param null
         */
        cakesDataService.prototype.getCakes = function () {
            var url = "api/cakes/";
            console.log("getCakes() called");
            return this.$http.get(url);
        };
        /**
         * @name getCakesByCategory
         * @description get json of cakes by category
         * @param {string} categoryName
         */
        cakesDataService.prototype.getCakesByCategory = function (categoryName) {
            console.log("getCakesByCategory() called");
            var deferred = this.$q.defer();
            var url = "api/category/";
            this.$http.get(url + categoryName)
                .then(function (response) {
                deferred.resolve(response.data);
            }, deferred.reject);
            return deferred.promise;
        };
        cakesDataService.prototype.getCakeById = function (cakeID) {
            console.log("getCakeById() called");
            var deferred = this.$q.defer();
            var url = "api/cakes/";
            this.$http.get(url + cakeID)
                .then(function (response) {
                deferred.resolve(response.data);
            }, deferred.reject);
            return deferred.promise;
        };
        cakesDataService.prototype.getSingleCake = function (cakeID) {
            return this.$http.get('data/cake' + cakeID + '.json');
        };
        cakesDataService.prototype.saveOrder = function (orderofCake) {
            var deferred = this.$q.defer();
            var url = "api/order/";
            console.log("saveCakeOrder called");
            console.log(orderofCake);
            this.$http.post(url, orderofCake)
                .then(function (response) {
                deferred.resolve(response.data);
            }, deferred.reject);
            return deferred.promise;
        };
        // upload on file select or drop
        cakesDataService.prototype.uploadSelectedFile = function (file) {
            var deferred = this.$q.defer();
            console.log("uploadSelectedFile called");
            console.log(file);
            this.Upload.upload({
                url: 'api/upload/',
                method: 'POST',
                data: {
                    file: file
                }
            }).then(function (response) {
                deferred.resolve(response.data);
            }, deferred.reject);
            return deferred.promise;
            // then((result : ng.IPromise<string>) =>{
            // 			console.log(result);
            // 			console.log('Success ' + result.data);
            //       return result.data;
            //   }, function (resp) {
            //       console.log('Error status: ' + resp.status);
            // 			//return resp.status;
            //   });
        };
        ;
        /**
         * @name goNext
         * @description Go to url of page
         * @param {string} path - url of page to navigate to
         */
        cakesDataService.prototype.goNext = function (path) {
            this.$location.path(path);
        };
        ;
        // injection of http and q dependencies
        cakesDataService.$inject = ["$http", "$q", "$location", "Upload"];
        return cakesDataService;
    }());
    // chaining module and service creates easier to read code
    angular
        .module("sucreesweb")
        .service("cakesDataService", cakesDataService);
})(sucreesweb || (sucreesweb = {}));
