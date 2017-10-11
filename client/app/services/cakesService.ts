module sucreesweb {
	// export interface to make services visible to controller
	export interface ICakesDataService {

		getCakes() : ng.IPromise<ng.IHttpPromiseCallbackArg<CakesList[]>>;
		getSingleCake(cakeID:number): ng.IPromise<ng.IHttpPromiseCallbackArg<CakesList[]>>;
		getCakeById(cakeID: number): ng.IPromise<CakesList[]>;
		setCakeOrder();
		getCakeOrder();
		saveOrder(orderofCake): ng.IPromise<any>;
		goNext(path: string);
		getCakesByCategory(categoryName: string): ng.IPromise<CakesList[]>;
		sendOrderEmail(order): ng.IPromise<any>;
		uploadSelectedFile(file: any): ng.IPromise<any>;
	}

	// data service must implement interface ??
	class cakesDataService implements ICakesDataService {

		// injection of http and q dependencies
		static $inject = ["$http", "$q", "$location","Upload"];
		constructor(private $http : ng.IHttpService, private $q : ng.IQService, private $location : ng.ILocationService, private Upload: ng.angularFileUpload.IUploadService) {
			var url = "api/cakes/";
		}

		private cakeorder = {};

		setCakeOrder(order) {
			this.cakeorder = order;
			console.log("setCakeOrder called");
			console.log(this.cakeorder);
		}

		getCakeOrder() {
			console.log("getCakeOrder() called");
			console.log(this.cakeorder);
			return this.cakeorder;
		}

		sendOrderEmail(order): ng.IPromise<any> {
			var deferred = this.$q.defer();
			var url = "api/sendrequest/";
			console.log("sendOrderEmail called");
			//return this.$http.post(url, order);
			this.$http.post(url, order)
				.then((response: any) => {
					deferred.resolve(response.data);
				}, deferred.reject);
			return deferred.promise;
		}

		/**
		 * @name getCakes
		 * @description get json list of all cakes
		 * @param null
		 */
		getCakes() : ng.IPromise<ng.IHttpPromiseCallbackArg<CakesList[]>> {
				var url = "api/cakes/";
				console.log("getCakes() called");
				return this.$http.get(url);
		}

		/**
		 * @name getCakesByCategory
		 * @description get json of cakes by category
		 * @param {string} categoryName
		 */
		getCakesByCategory(categoryName: string): ng.IPromise<CakesList[]> {
			console.log("getCakesByCategory() called");
      var deferred = this.$q.defer();
			var url = "api/category/";
      this.$http.get(url + categoryName)
        .then((response: any) => {
          deferred.resolve(response.data);
        }, deferred.reject);
      return deferred.promise;
    }

		getCakeById(cakeID: number): ng.IPromise<CakesList[]> {
			console.log("getCakeById() called");
      var deferred = this.$q.defer();
			var url = "api/cakes/";
      this.$http.get(url + cakeID)
        .then((response: any) => {
          deferred.resolve(response.data);
        }, deferred.reject);
      return deferred.promise;
    }

		getSingleCake(cakeID: number): ng.IPromise<ng.IHttpPromiseCallbackArg<CakesList[]>> {
			return this.$http.get('data/cake' + cakeID + '.json');
		}

		saveOrder(orderofCake): ng.IPromise<any> {
			var deferred = this.$q.defer();
			var url = "api/order/";
			console.log("saveCakeOrder called");
			console.log(orderofCake);
      this.$http.post(url, orderofCake)
        .then((response: any) => {
          deferred.resolve(response.data);
        }, deferred.reject);
      return deferred.promise;
		}

		// upload on file select or drop
    uploadSelectedFile(file: any): any {
			var deferred = this.$q.defer();
			console.log("uploadSelectedFile called");
			console.log(file);
			this.Upload.upload({
            url: 'api/upload/',
						method: 'POST',
            data: {
							file: file
						}
        }).then((response: any) => {
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


		/**
		 * @name goNext
		 * @description Go to url of page
		 * @param {string} path - url of page to navigate to
		 */
		goNext(path: string) {
  		this.$location.path(path);
		};


	}

	// chaining module and service creates easier to read code
	angular
		.module("sucreesweb")
		.service("cakesDataService", cakesDataService);

}
