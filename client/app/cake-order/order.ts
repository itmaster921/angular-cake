module sucreesweb {

	interface ICakeParams extends ng.route.IRouteParamsService {
				// cakeID matches the $routeParams id from $routeProvider
				cakeID: number;
  }

	class CakeOrderController {

		private showDatePicker: boolean = false;
		private cakeID: number;
		private cakeorders : any[];
		private cakeslists : CakesList[];
		private hasNoData: boolean = false;
		private hasErrors: boolean = false;
		private cakeorder = {};
		private galleryImages: any[];
		private cakeURL: any;

		// inject dependencies into controller
		static $inject = ["cakesDataService", "$scope", "$location", "$routeParams", "Upload"];

		constructor(private cakesDataService: ICakesDataService, private $scope: ng.IScope, private $location: ng.ILocationService, private $routeParams: ICakeParams, private Upload: ng.angularFileUpload.IUploadService) {

			//get the value from the route
    	this.cakeID = $routeParams.cakeID;

			this.getCakeData(this.cakeID);
			this.cakeorder = this.cakesDataService.getCakeOrder();

			this.hasNoData = this.checkforData(this.cakeorder);

			this.galleryImages = [
				{thumb: '../assets/images/gallery/mini-1.jpg', img: '../assets/images/gallery/1.jpg'},
	      {thumb: '../assets/images/gallery/mini-2.jpg', img: '../assets/images/gallery/2.jpg'},
	      {thumb: '../assets/images/gallery/mini-3.jpg', img: '../assets/images/gallery/3.jpg'},
	      {thumb: '../assets/images/gallery/mini-4.jpg', img: '../assets/images/gallery/4.jpg'},
				{thumb: '../assets/images/gallery/mini-5.jpg', img: '../assets/images/gallery/5.jpg'},
	      {thumb: '../assets/images/gallery/mini-6.jpg', img: '../assets/images/gallery/6.jpg'},
	      {thumb: '../assets/images/gallery/mini-12.jpg', img: '../assets/images/gallery/12.jpg'},
				{thumb: '../assets/images/gallery/mini-8.jpg', img: '../assets/images/gallery/8.jpg'},
	      {thumb: '../assets/images/gallery/mini-13.jpg', img: '../assets/images/gallery/13.jpg'},
				{thumb: '../assets/images/gallery/mini-14.jpg', img: '../assets/images/gallery/14.jpg'},
	      {thumb: '../assets/images/gallery/mini-11.jpg', img: '../assets/images/gallery/11.jpg'}
	    ];

		}







		/**
		 * @name getCakeData
		 * @description Get list of specfic cake
		 * @param {number} cakeID - id of cake
		 */
		getCakeData(cakeID: number) {
		    let promise = this.cakesDataService.getCakeById(cakeID);

				promise.then((result : ng.IHttpPromiseCallbackArg<CakesList[]>) =>{
		        this.cakeslists = result;
						console.log(result);
		    })
					.catch((reason : any) => {
						alert(reason.Message || reason.message);
				})
		}


		openDatePicker() {
			console.log("show date");
			this.showDatePicker = true;
		}

		closeDatePicker() {
			console.log("hide date");
			this.showDatePicker = false;
		}

		checkforData(cakeorder) {
			console.log(cakeorder);
			return angular.equals({}, cakeorder);
			//console.log(this.hasErrors);
		}

		saveCakeOrder(finalorder: any, picFile: any) {

				if(picFile) {

					this.cakesDataService.uploadSelectedFile(picFile)
						.then((result : ng.IHttpPromiseCallbackArg<any[]>) =>{
							this.cakeURL = result;
							this.finishcakeOrder(finalorder, this.cakeURL);
						})
				} else {
					this.cakeURL = '';
					this.finishcakeOrder(finalorder, this.cakeURL);
				}
		}

		finishcakeOrder(finalorder, cakeImgURL) {

			let currentOrder = {
				"cake": this.cakeslists,
				"cakeorder": this.cakeorder,
				"contact": finalorder,
				"cakeImgURL": cakeImgURL
			}

			console.log(currentOrder);

			let promise = this.cakesDataService.saveOrder(currentOrder);

			promise.then((result : ng.IHttpPromiseCallbackArg<any[]>) =>{
					console.log(result);
					this.cakesDataService.sendOrderEmail(currentOrder);
					this.cakesDataService.goNext('/thank-you');
			})
				.catch((reason : any) => {
					alert(reason.Message || reason.message);
			})

		}
	}

	// chaining module and controller creates easier to read code
	angular
		.module("sucreesweb")
		.controller("CakeOrderController", CakeOrderController);
}
