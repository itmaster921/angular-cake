module sucressweb {

	interface ICakeParams extends ng.route.IRouteParamsService {
				// cakeID matches the $routeParams id from $routeProvider
				cakeID: number;
  }

	class CakeDetailController {

		private cakeslists : CakesList[];
		private cakeID: number;
		private cakeorders: any[];
		private test: number;

		// inject dependencies into controller
		static $inject = ["$routeParams", "cakesDataService", "$location"];



		constructor(private $routeParams: ICakeParams, private cakesDataService: ICakesDataService, private $location: ng.ILocationService) {

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
			_.extend(this.order.colours.colour, this.selection);
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



			if(this.cakeslists.type == 'sweetparadise' && this.cakeslists.type_name == 'cupcakes') {
				return this.order = {
					packageID: { "id": 1, "package": 6 },
					quantityID: { "id" : 1, "value" : "One (1)" },
					flavoursID: { "id": 1, "value": "Chocolate", "price": 0.00 },
					colours: { colour: [] }
				};
			}
			if(this.cakeslists.type == 'sweetparadise' && this.cakeslists.type_name == 'cake') {
				return this.order = {
					packageID: { "id": 1, "package": 1 },
					quantityID: { "id" : 1, "value" : "One (1)" },
					flavoursID: { "id": 1, "value": "Chocolate", "price": 0.00 },
					colours: { colour: [] }
				};
			}
			if(this.cakeslists.type == 'sweetparadise' && this.cakeslists.type_name == 'muffins') {
				return this.order = {
					packageID: { "id": 1, "package": 4 },
					quantityID: { "id" : 1, "value" : "One (1)" },
					flavoursID: { "id": 1, "value": "Chocolate", "price": 0.00 },
					colours: { colour: [] }
				};
			}
			if(this.cakeslists.type == 'quartet' && this.cakeslists.type_name == 'cake') {

				this.selection =  ['Cherry'];

				return this.order = {
					packageID: { "id": 1, "package": 1 },
					quantityID: { "id" : 1, "value" : "One (1)" },
					flavoursID: { "id": 1, "value": "Regular", "price": 0.00 },
					colours: { colour: ['Cherry'] }
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

			console.log(this.order.cakePrice);

			if(packages.package == 6 || packages.package == 4 || packages.package == 1) {
				this.order.cakePrice = this.cakeslists.price[0].value;
			}
			if(packages.package == 12) {
				this.order.cakePrice = this.cakeslists.price[1].value;
			}
			if(flavour.price > '0.00') {
				this.order.cakePrice = flavour.price * packages.package;
			}
			console.log(flavour);
			console.log(quantity.id);
			console.log(packages.package);
			console.log(this.order.cakePrice);

			this.order.cakePrice *= quantity.id;
			return this.order.cakePrice;

		}

		// toggle selection for a given fruit by name
    toggleSelection(colourName) {
			console.log("toggleSelection called");

			this.hasErrors = false;

      let idx = this.selection.indexOf(colourName);

			console.log(idx);
			console.log(this.selection.length);

      // is currently selected
      if (idx > -1) {
        this.selection.splice(idx, 1);
      }
      // is newly selected
      else {
        this.selection.push(colourName);
      }
			console.log(this.selection);



			if(this.selection.length === 0) {
				console.log("Please pick at least 1 flavour");
				return this.hasErrors = true;
			}

			if(this.cakeslists.type == 'sweetparadise') {

				if(this.selection.length > 3) {
					console.log("Pick 3 Please");
					return this.hasErrors = true;
				}
			}

			if(this.cakeslists.type == 'quartet') {

				if(this.selection.length == 3 || this.selection.length > 4 || this.selection.length == 1) {
					console.log("Pick 2-4 Please");
					return this.hasErrors = true;
				}
			}

    };







	}
	// chaining module and controller creates easier to read code
	angular
		.module("sucreesweb")
		.controller("CakeDetailController", CakeDetailController);
}
