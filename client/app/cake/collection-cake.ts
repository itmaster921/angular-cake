module sucressweb {

	interface ICakeParams extends ng.route.IRouteParamsService {
				// cakeID matches the $routeParams id from $routeProvider
				cakeID: number;
  }

	class CakeCollectionDetailController {

		private cakeslists : CakesList[];
		private cakeID: number;
		private cakeorders: any[];

		// inject dependencies into controller
		static $inject = ["$routeParams", "cakesDataService", "$scope", "$location"];



		constructor(private $routeParams: ICakeParams, private cakesDataService: ICakesDataService, private $scope: ng.IScope, private $location: ng.ILocationService) {

			//get the value from the route
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
		        this.cakeslists = result;
						this.initCake();
						this.initCakePrice();
						console.log(result);
		    })
					.catch((reason : any) => {
						alert(reason.Message || reason.message);
				})
		}


    selection: string[] = ['Red'];
		hasErrors: boolean = false;
		cakePrice: number;
		order = {};

		/**
		 * @name initCakePrice
		 * @description initialise price
		 * @param (none)
		 */
		initCakePrice() {
			return this.order.cakePrice = this.cakeslists.price[0].value;
		}

		initCake() {
			if(this.cakeslists.type == 'seasonal') {
				this.order = {
					quantityID: { "id" : 1, "value" : "One (1)" },
					packageID: { "id" : 1, "package" : 1, "name" : "1 cake" },
					flavoursID: { "id": 2, "value": "Light Fruit", "price": 0.00 },
					colours: { colour: {} }
				};
			}
			if(this.cakeslists.type == 'christmas' && this.cakeslists.type_name == 'pudding') {
				this.order = {
					quantityID: { "id" : 1, "value" : "One (1)" },
					packageID: { "id" : 1, "package" : 1, "name" : "1 pan" },
					flavoursID: { "id": 1, "value": "w/o vanilla rum sauce", "price": 0.00 },
					colours: { colour: {} }
				};
			}
			if(this.cakeslists.type == 'personal') {
				this.order = {
					quantityID: { "id" : 1, "value" : "One (1)" },
					packageID: { "id" : 1, "package" : 1, "name" : "1 cake" },
					flavoursID: { "id": 1, "value": "Chocolate", "price": 0.00 },
					colours: { colour: {} }
				};
			}
			if(this.cakeslists.type == 'christmas' && this.cakeslists.type_name == 'cake') {
				this.order = {
					quantityID: { "id" : 1, "value" : "One (1)" },
					packageID: { "id" : 1, "package" : 1, "name" : "1 cake" },
					flavoursID: { "id": 1, "value": "Light Fruit", "price": 0.00 },
					colours: { colour: {} }
				};
			}
			if(this.cakeslists.type == 'christmas' && this.cakeslists.type_name == 'cheesecake') {
				this.order = {
					quantityID: { "id" : 1, "value" : "One (1)" },
					packageID: { "id" : 1, "package" : 1, "name" : "1 cake" },
					flavoursID: { "id": 1, "value": "Cherry, Coconut, Sorrel, Soursop", "price": 0.00 },
					colours: { colour: {} }
				};
			}
			if(this.cakeslists.type == 'christmas' && this.cakeslists.type_name == 'cupcakes') {
				this.order = {
					quantityID: { "id" : 1, "value" : "One (1)" },
					packageID: { "id" : 1, "package" : 6, "name" : "1 cake" },
					flavoursID: { "id": 1, "value": "Red Velvet", "price": 0.00 },
					colours: { colour: {} }
				};
			}
		}

		/**
		 * @name toggleQuantity
		 * @description initialise price
		 * @param {object},{object} - number of packages, size of package
		 */
		toggleQuantity(quantity, packages, flavour) {
			console.log("toggleQuantity called");

			console.log(flavour);
			console.log(quantity.id);
			//console.log(packages.package);
			//console.log(this.order.cakePrice);

			if(flavour.price != '0.00') {
				this.order.cakePrice = flavour.price;
			} else {
				this.order.cakePrice = this.cakeslists.price[0].value;
			}

			if(packages.package == 6) {
				this.order.cakePrice = this.cakeslists.price[0].value;
			}
			if(packages.package == 12) {
				this.order.cakePrice = this.cakeslists.price[1].value;
			}

			console.log(quantity.id);
			console.log(packages.package);

			console.log(this.order.cakePrice);
			this.order.cakePrice *= quantity.id;
			return this.order.cakePrice;

		}



	}
	// chaining module and controller creates easier to read code
	angular
		.module("sucreesweb")
		.controller("CakeCollectionDetailController", CakeCollectionDetailController);
}
