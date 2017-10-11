module sucreesweb {

	interface ICakeParams extends ng.route.IRouteParamsService {
		cakeID: number;
	}

	class CupCakeDetailController {

		private cakeslists : CakesList[];
		private cakeID: number;

		// inject dependencies into controller
		static $inject = ["cakesDataService","$routeParams","$location"];
		constructor(private cakesDataService: ICakesDataService, private $routeParams: ICakeParams, private $location: ng.ILocationService) {

			this.cakeID = $routeParams.cakeID;
			this.getCakeData(this.cakeID);
		}


			/**
			 * @name goNext
			 * @description Go to url of page
			 * @param {string} path - url of page to navigate to
			 */
			goNext(path) {
	  		this.$location.path(path);
				console.log(path);
			};

			setOrderData(order) {
				console.log(order);
				this.cakesDataService.setCakeOrder(order);
			}

			getOrderData() {
				this.cakeorders = this.cakesDataService.getCakeOrder();
				console.log(this.cakeorders);
			}

			nextOrderPhase(order, path) {
				this.setOrderData(order);
				console.log(order);
				this.goNext(path);


			}

			/**
			 * @name getCakeData
			 * @description Get list of specfic cake
			 * @param {number} cakeID - id of cake
			 */
			getCakeData(cakeID) {
			    let promise = this.cakesDataService.getCakeById(cakeID);

					promise.then((result : ng.IHttpPromiseCallbackArg<CakesList[]>) =>{
			        this.cakeslist = result;
							this.initCakePrice();
							console.log(result);
			    })
						.catch((reason : any) => {
							alert(reason.Message || reason.message);
					})
			}

			hasErrors: boolean = false;
			cakePrice: number;

			order = {
				packageID: {
					"id": 1,
					"package": 12,
					"name": "12 standard cupcakes"
				},
				quantityID: {
					"id" : 1,
					"value" : "One (1)"
				},
				flavoursID: { },
				colours: { colour: {} }
			};

			/**
			 * @name initCakePrice
			 * @description initialise price
			 * @param (none)
			 */
			initCakePrice() {
				return this.order.cakePrice = this.cakeslist.price[0].value * this.cakeslist.package_sizes[0].package;
			}

			/**
			 * @name toggleQuantity
			 * @description initialise price
			 * @param {object},{object} - number of packages, size of package
			 */
			toggleQuantity(quantity, packages) {
				console.log("toggleQuantity called");

				if(packages.package == 12) {
					this.order.cakePrice = this.cakeslist.price[0].value * this.cakeslist.package_sizes[0].package;
				}
				if(packages.package == 24) {
					this.order.cakePrice = this.cakeslist.price[1].value * this.cakeslist.package_sizes[1].package;
				}

				console.log(quantity.id);
				console.log(packages.package);
				console.log(this.order.cakePrice);

				this.order.cakePrice *= quantity.id;
				return this.order.cakePrice;

			}


	}
	angular
		.module("sucreesweb")
		.controller("CupCakeDetailController", CupCakeDetailController);

}
